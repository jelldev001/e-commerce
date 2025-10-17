const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

const authenCheck = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization // เป็นตรวตสอบในการส่ง token

        // console.log("middlewares")
        if (!headerToken) {
            return res.status(401).send({ message: "No token , authorization" })
        }
        if (!headerToken || !headerToken.startsWith("Bearer")) {
            return res.status(401).send({ message: "Invalid aunthication format" });
        }
        const token = headerToken.split(" ")[1] // แยกเอา token ออกจากคำว่า "Bearer"
        const decode = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY)
        req.user = decode
        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })
        if (!user) {
            return res.status(404).send({ message: "user is not found" });
        }
        if (!user.enabled) {
            res.status(400).send({ message: "this account cannot accept" })
        }
        // console.log(user)
        // console.log(decode)

        next()
    } catch (err) {
        res.status(500).send({ message: "token invalid" })
    }


}
const adminCheck = async (req,res , next) => {
    try{
        const {email} = req.user;  
        const adminUser = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(!adminUser|| adminUser.role!=="admin"){
            return res.status(403).send({message:"Acess Denied : Admin Only"})
        }
        //  console.log( "admin check ",adminUser)
       
        next()
    }catch (err){
        res.status(500).send({message:"Server error to verify admin"})
    }

}
module.exports = { authenCheck, adminCheck };
