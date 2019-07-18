const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const tagController = require('../controllers/tagController');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const addressController = require('../controllers/addressController');

router.get('/tags', tagController.all);
router.post('/tags', tagController.create);
router.get('/tags/:id', tagController.find);
router.put('/tags/:id', tagController.update);
router.delete('/tags/:id', tagController.delete);

router.get('/products', productController.all);
router.post('/products', productController.create);
router.get('/products/:id', productController.find);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

router.get('/products', productController.all);
router.post('/products', productController.create);
router.get('/products/:id', productController.find);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

router.get('/user', userController.all);
router.get('/user/:id', userController.find);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);
router.get('/user/:id/order-history/', userController.orders);
router.get('/user/:id/order-history/:orderId', userController.findOrder);

router.get('/user/:id/cart', cartController.cartAllItems);
router.post('/user/:id/cart:cartId', cartController.cartAddItem);
router.put('/user/:id/cart/:cartId/', cartController.cartUpdateItem);
router.delete('/user/:id/cart/:cartId', cartController.cartDeleteItem);
router.put('/user/:id/cart/:id/checkout', cartController.checkout);

router.get('/user/:id/user-address/', addressController.allAddresses);
router.post('/user/:id/user-address/', addressController.createUserAddress);
router.get('/user/:id/user-address/:addressId', addressController.findAddress);
router.put(
  '/user/:id/user-address/:addressId',
  addressController.updateAddress
);
router.delete(
  '/user/:id/user-address/:addressId',
  addressController.deleteAddress
);

module.exports = router;
