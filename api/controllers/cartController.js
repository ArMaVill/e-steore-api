const bcrypt = require('bcryptjs');
const user = require('../model/user');
const product = require('../model/product');

const { User, Cart } = user;
const { Product } = product;

const cartController = {
  cartAllItems(req, res) {
    const { id } = req.params;
    console.log(req.params);
    if (!id) {
      return res
        .status(400)
        .json({ message: 'No se pueden encontrar productos1' });
    }

    User.findOne({ _id: id }).then(user => {
      if (user) {
        return res.json({ cart: user.cart });
      }
      return res
        .status(400)
        .json({ message: 'No se pueden encontrar productos2' });
    });
  },
  cartAddItem(req, res) {
    const { id } = req.params;
    const { itemId } = req.body;

    User.findOne({ _id: id })
      .then(user => {
        if (user) {
          const item = {
            quantity: 1,
            product: itemId
          };

          const { cart } = user;
          const { items } = cart;
          let itemAmount = 1;
          for (let index = 0; index < items.length; index += 1) {
            if (items[index].product.toString() === item.product) {
              itemAmount = items[index].quantity + 1;
              items.splice(index, 1);
              index -= 1;
            }
          }
          item.quantity = itemAmount;
          cart.items.push(item);

          user
            .save()
            .then(result => {
              return res.json({ result });
            })
            .catch(err => {
              res.status(400).json({ err, msg: `No producto` });
            });
        } else {
          return res.json({ message: 'No se encontro el carrito del Usuario' });
        }
      })
      .catch(err => {
        res.status(400).json({ err, msg: `No se pudo agregar el producto` });
      });
  },
  cartUpdateItem(req, res) {
    const { id } = req.params;
    const { itemId, newItemAmount } = req.body;

    User.findOne({ _id: id })
      .then(user => {
        if (user) {
          const { cart } = user;
          const { items } = cart;
          const index = 1;
          for (let index = 0; index < items.length; index += 1) {
            if (items[index].product.toString() === itemId) {
              items[index].quantity = newItemAmount;
              if (newItemAmount === 0) {
                items.splice(index, 1);
                index -= 1;
              }
            }
          }
          cart.items = items;

          user
            .save()
            .then(result => {
              return res.json({ result });
            })
            .catch(err => {
              res.status(400).json({ err, msg: `No producto` });
            });
        } else {
          return res.json({ message: 'No se encontro el carrito del Usuario' });
        }
      })
      .catch(err => {
        res.status(400).json({ err, msg: `No se pudo agregar el producto` });
      });
  },
  cartDeleteItem(req, res) {
    const { id } = req.params;
    const { itemId } = req.body;

    User.findOne({ _id: id })
      .then(user => {
        if (user) {
          const { cart } = user;
          const { items } = cart;
          const index = 1;
          for (let index = 0; index < items.length; index += 1) {
            if (items[index].product.toString() === itemId) {
              items.splice(index, 1);
              index -= 1;
            }
          }
          cart.items = items;

          user
            .save()
            .then(result => {
              return res.json({ result });
            })
            .catch(err => {
              res.status(400).json({ err, msg: `No producto` });
            });
        } else {
          return res.json({ message: 'No se encontro el carrito del Usuario' });
        }
      })
      .catch(err => {
        res.status(400).json({ err, msg: `No se pudo agregar el producto` });
      });
  },
  checkout(req, res) {}
};

module.exports = cartController;
