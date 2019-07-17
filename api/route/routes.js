const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const tagController = require('../controllers/tagController');

router.get('/tags', tagController.all);
router.post('/tags', tagController.create);
router.get('/products', productController.all);
router.get('/products/:id', productController.find);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);

module.exports = router;
