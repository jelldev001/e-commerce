 const express = require('express');
const router = express.Router();
const { creat ,list , remove} = require('../controllers/categary');
const {adminCheck ,authenCheck} = require ('../middlewares/authenCheck') 

router.post('/category',authenCheck,adminCheck, creat);
router.get('/list/categories',
    authenCheck,
    adminCheck,
    list)
router.delete('/remove/:id',authenCheck,adminCheck,remove); 

module.exports = router