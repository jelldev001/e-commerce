const express = require('express')
const router = express.Router()

const { listUser,
    changseStatus,
    changeRole,
    userCart,
    getUserCart,
    getOrder,
    emptyCart,
    saveAddress,
    saveOrder } = require('../controllers/user')
const { authenCheck, adminCheck } = require('../middlewares/authenCheck')

router.get('/users', authenCheck, adminCheck, listUser)
router.post('/change-status', authenCheck, adminCheck,  changseStatus)
router.post('/change-role', authenCheck, adminCheck, changeRole)

router.post('/user/cart', authenCheck, userCart)
router.get('/user/cart', authenCheck, getUserCart)
router.delete('/user/cart', authenCheck, emptyCart)

router.post('/user/address', authenCheck, saveAddress)
router.post('/user/order', authenCheck, saveOrder)
router.get('/user/order', authenCheck, getOrder)


module.exports = router