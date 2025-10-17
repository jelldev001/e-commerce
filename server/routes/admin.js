const express = require ('express')
const router = express.Router()
const {authenCheck} = require ('../middlewares/authenCheck')
const {changOrderStatus,getOrderAdmin} = require ('../controllers/admin')
router.put('/admin/order-status' , changOrderStatus)
router.get('/admin/orders',authenCheck , getOrderAdmin)



module.exports = router;
