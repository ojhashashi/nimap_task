const express = require('express');
const router = express.Router();

const productC = require('../controllers/productController')

router
    .get('/show-pdt', productC.showProduct)
    .get('/pdt-cat/:id', productC.selectProductById)
    .post('/add-pdt', productC.insertProduct)
    .put('/update-pdt/:productid', productC.updateProduct)
    .delete('/delete-pdt/:productid', productC.deleteProduct);

module.exports = router;