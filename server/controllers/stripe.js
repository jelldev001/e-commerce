const prisma = require('../config/prisma')
const payment = async (req, res) => {
    try {
        
        res.send("stripe")
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

module.exports =payment