const express = require('express');
const router = express.Router();
const{register,login,currentUser} = require('../controllers/auth');
const {authenCheck , adminCheck } = require ('../middlewares/authenCheck')

router.post ('/register',register)
router.post ('/login',login)
router.post ('/current-user',authenCheck, currentUser);
router.post ('/current-admin',authenCheck,adminCheck, currentUser);



module.exports = router;