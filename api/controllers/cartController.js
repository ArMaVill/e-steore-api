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
    const { cartId } = req.params;
    const { itemId } = req.body;
    if (!cartId) {
      return res
        .status(400)
        .json({ message: 'No se pueden encontrar productos' });
    }
    Cart.findOne({ _id: cartId })
      .then(cart => {
        if (cart) {
          const newCart = new Cart();
          const item = {
            quantity: 1,
            product: itemId
          };

          cart.items.push(item).catch(err => {
            res.status(400).json({ err, msg: `Producto invalido` });
          });
          console.log(cart);

          cart
            .save()
            .then(cart => {
              return res.json({ cart });
            })
            .catch(err => {
              res.status(400).json({ err, msg: `No producto` });
            });
        } else {
          return res.json({ message: 'erro' });
        }
      })
      .catch(err => {
        res.status(400).json({ err, msg: `No se pudo agregar el producto` });
      });
  },
  cartUpdateItem(req, res) {},
  cartDeleteItem(req, res) {},
  checkout(req, res) {}
};

module.exports = cartController;
