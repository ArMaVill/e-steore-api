const model = require('../model/user');

const { User, Product } = model;

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
            product: itemId,
            quantity: 2,
            total: 0
          };

          const { cart } = user;

          let itemAmount = 1;
          for (let index = 0; index < cart.length; index += 1) {
            if (cart[index].product.toString() === item.product) {
              itemAmount = cart[index].quantity + 1;
              cart.splice(index, 1);
              index -= 1;
            }
          }
          item.quantity = itemAmount;

          Product.findOne({ _id: itemId }).then(product => {
            if (product) {
              item.total = product.price * itemAmount;

              cart.push(item);

              user.cart = cart;

              user
                .save()
                .then(result => {
                  return res.json({
                    error: false,
                    message:
                      'Se añadio un nuevo producto al carrito de compras',
                    result
                  });
                })
                .catch(err => {
                  res.status(400).json({
                    error: true,
                    message: `No se encontro el producto`
                  });
                });
            } else {
              return res.json({
                error: false,
                message: 'producto no encontrado'
              });
            }
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

          const index = 1;
          for (let index = 0; index < cart.length; index += 1) {
            if (cart[index].product.toString() === itemId) {
              cart[index].quantity = newItemAmount;
              if (newItemAmount === 0) {
                cart.splice(index, 1);
                index -= 1;
              }
            }
          }

          user.cart = cart;
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

          for (let index = 0; index < cart.length; index += 1) {
            if (cart[index].product.toString() === itemId) {
              cart.splice(index, 1);
              index -= 1;
            }
          }
          user.cart = cart;

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
