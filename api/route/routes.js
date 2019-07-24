const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const tagController = require('../controllers/tagController');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/middleware');

router.get('/api/tags', tagController.all);
router.post('/api/tags', tagController.create);
router.get('/api/tags/:id', tagController.find);
router.put('/api/tags/:id', tagController.update);
router.delete('/api/tags/:id', tagController.delete);

router.get('/api/product', productController.all);
router.post('/api/product', productController.create);
router.get('/api/product/:id', productController.find);
router.put('/api/product/:id', productController.update);
router.delete('/api/product/:id', productController.delete);

router.get('/api/product', productController.all);
router.post('/api/product', productController.create);
router.get('/api/product/:id', productController.find);
router.put('/api/product/:id', productController.update);
router.delete('/api/product/:id', productController.delete);
router.get('/api/product/tag/:name', productController.productByTag);

router.get('/api/users', userController.all);
router.get('/api/user/', auth, userController.find);
router.put('/api/user/:id', auth, userController.update);
router.delete('/api/user/:id', auth, userController.delete);
router.post('/api/user/register', userController.register);
router.post('/api/auth/login', userController.login);
router.post('/api/auth/logout', userController.logout);

router.get('/api/user/:id/cart/', cartController.cartAllItems);
router.post('/api/user/:id/cart/', cartController.cartAddItem);

router.get('/api/user/order-history/', auth, orderController.allOrders);
router.post('/api/user/cart/checkout', auth, orderController.createOrder);
router.get('/api/user/order-history/:orderId', auth, orderController.findOrder);
router.put(
  '/api/user/:id/order-history/:orderId',
  orderController.completeOrder
);
router.delete(
  '/api/user/:id/order-history/:orderId',
  orderController.cancelOrder
);

module.exports = router;
