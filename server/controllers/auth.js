const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { email, password } = req.body;
       
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        // step 2: check if user already exists
        if (user) {
            return res.status(400).json({ message: 'email already exists' });
        }
        // step 3: hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // step 4: create user
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });
        // console.log(email, password);
        // console.log(hashedPassword);
        res.send('Register suscessful');
    } catch (error) {

        console.error('Error in register:', error);
        res.status(500).json({message:'server error'});
    }


}

const login = async(req, res) => {
    
    try {
        const { email, password } = req.body;

        // step 1: check email and password
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user || !user.enabled) {

            return res.status(400).json({message:'User not found or enabled'});

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){

            return res.status(400).json({message:' password Invalid '});
        }
        //step 2: create payload
        const payload = {
            userId: user.id,
            email: user.email,
            role : user.role 
        };
        console.log(payload);
        // step 3: generate token
        const token = jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, { expiresIn: '5h' },(err,token)=>{
            if (err) {
                return res.status(500).json({message:'server error'});
            }
            res.json({ payload,token });
        });
       // console.log(token);  

        // console.log(email, password);
        // res.send('Login successful'); ไม่ต้องส่งข้อความนี้เพราะส่ง token ไปแล้ว
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).send('Internal Server Error');
    }
}

const currentUser = async (req,res)=> {
    try {
        const user = await prisma.user.findFirst({
            where :{
                email :req.user.email
            },
            select : {
                id : true,
                email:true,
                role :true,
                name :true
            }
        })
        // console.log(user)
        res.send(user);
    }catch (error) {
        console.error('Error in currentUser:', error);
        res.status(500).json({message:'server error'});
    }   
}



module.exports = {
    register: register,
    login: login,
    currentUser: currentUser,
};