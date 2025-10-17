const express = require('express');
const router = express.Router();
const{adminCheck,authenCheck}= require('../middlewares/authenCheck')
const {
    createProduct,
    listProducts,
    removeProduct,
    searchProducts,
    updateProduct,
    listbyProduct,
    readProduct,
    creatImages,
    removeImage
} = require('../controllers/product');

router.post('/product', createProduct);
router.get('/products/:count', listProducts)
router.delete('/product/:id', removeProduct)
router.post('/search/filter', searchProducts);
router.put('/product/:id', updateProduct);
router.post('/productby', listbyProduct);
router.get('/product/:id', readProduct);
router.post('/product/images',authenCheck,adminCheck,creatImages );
router.post('/product/removeimage',authenCheck,adminCheck,removeImage );

module.exports = router;