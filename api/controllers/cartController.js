const user = require('../model/user');

const { User } = user;

const cartController = {
  cartAllItems(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: 'No se pueden encontrar productos' });
    }

    User.findOne({ _id: id }).then(user => {
      if (user) {
        return res.json({
          error: false,
          message: 'Carrito de Compras',
          result: user.cart
        });
      }
      return res
        .status(400)
        .json({ error: true, message: 'No se pueden encontrar productos' });
    });
  },
  cartAddItem(req, res) {
    const { id } = req.params;
    const { itemId } = req.body;
    console.log(req.body.itemId, id);
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
              return res.json({
                error: false,
                message: 'Se añadio un nuevo producto al carrito de compras',
                result
              });
            })
            .catch(err => {
              res
                .status(400)
                .json({ error: true, message: `No se encontro el producto` });
            });
        } else {
          return res.json({
            error: true,
            message: 'No se encontro el carrito del Usuario'
          });
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({ error: true, message: `No se pudo agregar el producto` });
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
              return res.json({
                error: false,
                message: 'Se modífico un producto en el carrito de compras',
                result
              });
            })
            .catch(err => {
              res.status(400).json({ error: true, message: `No producto` });
            });
        } else {
          return res.json({
            error: true,
            message: 'No se encontro el carrito del usuario'
          });
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({ error: true, message: `No se pudo agregar el producto` });
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
              return res.json({
                error: false,
                message: 'Se elimino un producto del carrito de compras',
                result
              });
            })
            .catch(err => {
              res.status(400).json({ err, message: `No producto` });
            });
        } else {
          return res.json({
            error: true,
            message: 'No se encontro el carrito del Usuario'
          });
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({ error: true, message: `No se pudo agregar el producto` });
      });
  },
  checkout(req, res) {}
};

module.exports = cartController;
