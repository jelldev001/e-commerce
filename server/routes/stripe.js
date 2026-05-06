const express = require('express')
const router = express.Router()
const { authCheck } = require('../middlewares/authenCheck')
const stripe = require('../controllers/stripe')
router.get('/user/create-payment-inthent', stripe)



module.exports = router;
