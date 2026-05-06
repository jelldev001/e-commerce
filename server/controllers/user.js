const prisma = require('../config/prisma')
const listUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })
        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
const changseStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body //ต้้องส่ง {id,enabled:true or false} จาก postman
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { enabled: enabled }
        })
        console.log(id, enabled)
        res.send("update status success")
    } catch (err) {
        res.status().send({ message: "" })
    }

}
const changeRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { role: role }
        })
        console.log(id, role)
        res.send("Update Role success")
    } catch (err) {
        res.status().send({ message: "" })
    }
}
const userCart = async (req, res) => {
    try {
        const { cart } = req.body;
        console.log(cart);
        const user = await prisma.user.findFirst({
            where: {
                id: Number(req.user.userId),
            }
        })

        // console.log(user)
        console.log(req.user.userId)
        // // deleted old cart Item
        await prisma.productOncart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id
                }
            }
        })
        // // delete old cart
        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id
            }
        })
        // //เตียมสี้นต้า
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price

        }))

        // หาผลรวม
        let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0) //item.price * item.count คำนวณราคารวมของสินค้านั้น (ราคาต่อชิ้น × จำนวน)     

        //New cart 
        const newcart = await prisma.cart.create({
            data: {

                products: {
                    create: products
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }


        })
        console.log(products)
        // console.log(cartTotal)
        console.log(newcart)
        res.send("Add cart OK")
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server Error" })
    }
}

const getUserCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.userId)

            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        // console.log(cart);
        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}
const emptyCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.userId)
            }
        })
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" })
        }
        await prisma.productOncart.deleteMany({
            where: {
                cartId: cart.id
            }
        })
        const result = await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.userId)
            }
        })
        // console.log(result)
        res.send({
            message: "Cart is empty",
            deletedcount: result.count
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }

}
const saveAddress = async (req, res) => {
    try {
        const { address } = req.body;
        console.log(address);
        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.userId)
            },
            data: {
                address: address
            }
        })
        res.send({ message: "save Address success", ok: true })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const saveOrder = async (req, res) => {
    try {
        //Step 1 User cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.userId)
            },
            include: {
                products: true
            }
        })
        // empty cart check
        if (!userCart || userCart.products.length === 0) {
            return res.status(400).send({ message: "Cart is empty" })
        }
        // quantity check
        for (let item of userCart.products) {

            const product = await prisma.product.findUnique({  // findUnique คือการหา recode ที่เป็น unique เช่น @unique
                where: {
                    id: item.productId
                },
                select: {
                    quantity: true,
                    title: true

                }
            })
            if (!product || item.count > product.quantity) {
                return res.status(400).send({ message: `${product.title} is out of stock` })
            }
            console.log(item)
            console.log(product)
        }
        // creat new order 
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price,
                        quantity: item.count
                    }))
                },
                orderedBy: {
                    connect: { id: Number(req.user.userId) }

                },
                cartTotal: userCart.cartTotal
            }
        })

        //Update product 
        const updateProduct = userCart.products.map((item) => ({
            where: { id: item.productId },
            data: {
                quantity: { decrement: item.count },
                sold: { decrement: item.count }
            }
        }))

        await Promise.all(
            updateProduct.map((update) => prisma.product.update(update))
        )
        await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.userId)
            }
        })
        // console.log(userCart)
        console.log(updateProduct)
        res.json({ ok: true, order })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server Error" })
    }
}
const getOrder = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                orderedById: Number(req.user.userId)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        if (orders.length === 0) {
            return res.status(404).json ({message:"No order found"})
        }
        // console.log(orders)
        res.json(orders)
    } catch (err) {
        res.status(500).send({ message: err })
    }
}
module.exports = {
    listUser,
    changseStatus,
    changeRole,
    userCart,
    getUserCart,
    getOrder,
    emptyCart,
    saveAddress,
    saveOrder

}