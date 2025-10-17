
const prisma = require('../config/prisma');
const cloudinary = require('cloudinary').v2 //เป็นการเข้าถืงobject
const createProduct = async (req, res) => {
    try {
        const { title, description, price, images, quantity, categoryId } = req.body;
        console.log(title, description, price, images, quantity, categoryId);
        const product = await prisma.product.create(
            {
                data: {
                    title: title,
                    description: description,
                    price: parseFloat(price),
                    quantity: parseInt(quantity), // จำนวนสินค้า
                    categoryId: parseInt(categoryId), // หมวดหมู่สินค้า
                    images: {
                        create: images.map((item) => ({
                            assetId: item.assetId,
                            publicId: item.publicId,
                            url: item.url,
                            secureUrl: item.secureUrl,
                        }))

                    }
                }
            }
        )
        res.send(product);
    } catch (err) {
        console.error('Error in createProduct:', err);
        res.status(500).json({ message: 'server error' });
    }

}
const listProducts = async (req, res) => {
    try {
        const { count } = req.params;
        // console.log( typeof count); // ตรวจสอบประเภทของ count
        const products = await prisma.product.findMany({
            take: parseInt(count), // แปลง count เป็นตัวเลข
            orderBy: {
                createdAt: 'desc' // เรียงลำดับตามวันที่สร้างล่าสุด
            },
            include: {
                category: true, // รวมข้อมูลหมวดหมู่
                images: true // รวมข้อมูลรูปภาพ
            }
        })
        res.send(products);
    } catch (error) {
        console.error('Error in listProducts:', error);
        res.status(500).json({ message: 'server error' });
    }
}
const readProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                category: true, // รวมข้อมูลหมวดหมู่
                images: true // รวมข้อมูลรูปภาพ
            }
        })
        res.send(product);
    } catch (err) {
        console.error('Error in readProduct:', err);
        res.status(500).json({ message: 'server error' });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, images, quantity, categoryId } = req.body;
        // console.log(title, description, price, images, quantity, categoryId);

        const { id } = req.params;
        await prisma.image.deleteMany({
            where: {
                productId: Number(id)
            }
        }); // ลบรูปภาพเก่า
        const product = await prisma.product.update(
            {
                where: {
                    id: Number(id)
                },
                data: {
                    title: title,
                    description: description,
                    price: parseFloat(price),
                    quantity: parseInt(quantity), // จำนวนสินค้า
                    categoryId: parseInt(categoryId), // หมวดหมู่สินค้า
                    images: {
                        create: images.map((item) => ({
                            assetId: item.assetId,
                            publicId: item.publicId,
                            url: item.url,
                            secureUrl: item.secureUrl,
                        }))

                    }
                }
            }
        )
        res.send(product);
    } catch (error) {
        console.error('Error in upDateProduct:', error);
        res.status(500).json({ message: 'server error' });
    }
}
const removeProduct = async (req, res) => {

    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: {
                id: Number(id),
            }
        });
        res.send('delete suscess');
    } catch (error) {
        console.error('Error in removeProduct:', error);
        res.status(500).json({ message: 'server error' });
    }
}
const handleQuery = async (req, res, query) => {
    console.log('Handling query:', query);
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query, // ค้นหาชื่อสินค้าที่มีคำค้นหา
                }
            },
            include: {
                category: true, // รวมข้อมูลหมวดหมู่
                images: true // รวมข้อมูลรูปภาพ
            }
        })
        res.send(products);
    } catch (err) {
        console.error('Error in handleQuery:', err);
        res.status(500).json({ message: 'server error' });
    }
}

const handlePrice = async (req, res, price) => {
    console.log('Handling price:', price);
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: price[0], // ค้นหาสินค้าที่มีราคามากกว่าหรือเท่ากับราคาเริ่มต้น
                    lte: price[1] // ค้นหาสินค้าที่มีราคาน้อยกว่าหรือเท่ากับราคาสิ้นสุด
                }
            },
            include: {
                category: true, // รวมข้อมูลหมวดหมู่
                images: true // รวมข้อมูลรูปภาพ
            }
        })
        res.send(products);
    } catch (err) {
        console.error('Error in handlePrice:', err);
        res.status(500).json({ message: 'server error' });
    }
}

const handleCategory = async (req, res, categoryId) => {
    console.log('Handling category:', categoryId);
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true, // รวมข้อมูลหมวดหมู่
                images: true // รวมข้อมูลรูปภาพ
            }
        })
        res.send(products);
    } catch (err) {
        console.error('Error in handleCategory:', err);
        res.status(500).json({ message: 'server error' });
    }
}
const searchProducts = async (req, res) => {

    try {
        const { query, category, price } = req.body;
        if (query) {
            console.log('Searching products with query:', query);
            await handleQuery(req, res, query);

        }
        if (category) {
            console.log('Filtering by category:', category);
            await handleCategory(req, res, category);
        }
        if (price) {
            console.log('Filtering by price:', price);
            await handlePrice(req, res, price);
        }
        // res.send('search products');
    } catch (error) {
        console.error('Error in searchProducts:', error);
        res.status(500).json({ message: 'server error' });
    }
}
const listbyProduct = async (req, res) => {
    try {
        const { sort, order, limit } = req.body;
        console.log(sort, order, limit);
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true, // รวมข้อมูลหมวดหมู่
            }
            // ase : true // เรียงลำดับจากน้อยไปมาก
            // desc : true // เรียงลำดับจากมากไปน้อย
        })

        res.send(products);
    } catch (error) {
        console.error('Error in listbyProduct:', error);
        res.status(500).json({ message: 'server error' });
    }
}
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const creatImages = async (req, res) => {
    try {
        // เพิ่ม validation
        if (!req.body.image) {
            return res.status(400).json({
                message: 'Missing required parameter - image'
            });
        }

        const uploadResult = await cloudinary.uploader.upload(req.body.image, {
            public_id: `isMe${Date.now()}`,
            resource_type: 'auto',
            folder: 'ecom24-9-25'
        });
        // res.send("Hi")
        res.send(uploadResult);
    } catch (error) {
        console.error('Error in creatimages:', error);
        res.status(500).json({
            message: error.message || error
        });
    }
}
const removeImage = async (req, res) => {
    try {
        const { public_id } = req.body
        console.log(public_id)
        await cloudinary.uploader.destroy(public_id,(result) => {
            res.send('remove success')
        })
    }
    catch (error) {
        console.error('Error in listbyProduct:', error);
        res.status(500).json({ message: error })
    }
}

module.exports = {
    createProduct,
    listProducts,
    removeProduct,
    searchProducts,
    updateProduct,
    listbyProduct,
    readProduct,
    creatImages,
    removeImage
};