const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const tagController = require('../controllers/tagController');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const addressController = require('../controllers/addressController');
const orderController = require('../controllers/orderController');

router.get('/api/tags', tagController.all);
router.post('/api/tags', tagController.create);
router.get('/api/tags/:id', tagController.find);
router.put('/api/tags/:id', tagController.update);
router.delete('/api/tags/:id', tagController.delete);

router.get('/api/products', productController.all);
router.post('/api/products', productController.create);
router.get('/api/products/:id', productController.find);
router.put('/api/products/:id', productController.update);
router.delete('/api/products/:id', productController.delete);

router.get('/api/products', productController.all);
router.post('/api/products', productController.create);
router.get('/api/products/:id', productController.find);
router.put('/api/products/:id', productController.update);
router.delete('/api/products/:id', productController.delete);

router.get('/api/user', userController.all);
router.get('/api/user/:id', userController.find);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);
router.post('/api/user/register', userController.register);
router.post('/api/user/login', userController.login);
router.post('/api/user/logout', userController.logout);

router.get('/api/user/:id/order-history/', orderController.allOrders);
router.post('/api/user/:id/cart/checkout', orderController.createOrder);
router.get('/api/user/:id/order-history/:orderId', orderController.findOrder);
router.put(
  '/api/user/:id/order-history/:orderId',
  orderController.completeOrder
);
router.delete(
  '/api/user/:id/order-history/:orderId',
  orderController.cancelOrder
);

router.get('/api/user/:id/cart', cartController.cartAllItems);
router.post('/api/user/:id/cart/', cartController.cartAddItem);
router.put('/api/user/:id/cart/', cartController.cartUpdateItem);
router.delete('/api/user/:id/cart/', cartController.cartDeleteItem);

router.get('/api/user/:id/user-address/', addressController.allAddresses);
router.post('/api/user/:id/user-address/', addressController.createUserAddress);
router.get(
  '/api/user/:id/user-address/:addressId',
  addressController.findAddress
);
router.put(
  '/api/user/:id/user-address/:addressId',
  addressController.updateAddress
);
router.delete(
  '/api/user/:id/user-address/:addressId',
  addressController.deleteAddress
);

module.exports = router;
