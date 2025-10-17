const prisma = require("../config/prisma");

const creat = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name: name,
            }
        });

        console.log(category);
        res.send(category);
    } catch (error) {
        console.error('Error in create:', error);
        res.status(500).json({ message: 'server error' });
    }
}

const list = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error('Error in list:', error);
        res.status(500).json({ message: 'server error' });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: Number(id),
            }
        });

        res.send(category);
    } catch (error) {
        console.error('Error in remove:', error);
        res.status(500).json({ message: 'server error' });
    }
}
module.exports = {
    creat: creat,
    list: list,
    remove: remove,
};