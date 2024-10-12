const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product routes
router.post('/products', productController.addProduct);
router.get('/products', productController.getProducts); // Existing route for getting all products
router.get('/products/search/:query', productController.searchProducts); // New route for searching
router.get('/products/sorted', productController.getProductsSortedByPrice); // New route for sorting products by price
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
