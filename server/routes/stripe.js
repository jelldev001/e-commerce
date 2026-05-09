const express = require('express')
const router = express.Router()
const { authCheck } = require('../middlewares/authenCheck')
const payment = require('../controllers/stripe')
router.get('/user/create-payment-inthent', payment)



module.exports = router;
