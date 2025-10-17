const  prisma = require("../config/prisma");

const changOrderStatus = async (req, res) => {
    try {
        const {orderId , orderStatus} = req.body;
        const orderUpdate = await prisma.order.update({
            where :{
                id :orderId
            },
            data :{
                status : orderStatus
            }
        })
        // console.log(req.body)
        // console.log(orderStatus,orderId)
        res.json({ message: "change order status", orderUpdate })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error"  ,err})
    }
}

const getOrderAdmin = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products :{
                    include:{
                        product : true
                    }
                },
                orderedBy :{
                    select :{
                        id : true ,
                        email : true ,
                        address : true
                    }
                }
            }
        })
        res.json({ message: "getOrderAdmin" , orders})
    } catch (err) {
        res.status(500).json({ message: "server Error" })
    }
}

module.exports = {
    changOrderStatus,
    getOrderAdmin
}