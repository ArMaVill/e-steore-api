const Model = require('../model/user');

const { User, Address, Order } = Model;

const orderController = {
  allOrders(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: 'Especifique el usuario' });
    }
    User.findOne({ _id: id }).then(user => {
      if (user) {
        const { orders } = user;
        if (orders === []) {
          return res
            .status(400)
            .json({ error: true, message: 'No hay ordenes' });
        }
        return res.json({ error: false, message: 'Lista de ordenes', orders });
      }
      return res
        .status(400)
        .json({ error: true, message: 'No se pueden encontrar productos' });
    });
  },
  findOrder(req, res) {
    const { id, orderId } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: 'Especifique el usuario' });
    }
    User.findOne({ _id: id }).then(user => {
      if (user) {
        const { orders } = user;
        if (orders.length < 1) {
          return res
            .status(400)
            .json({ error: true, message: 'No hay ordenes' });
        }
        for (let index = 0; index < orders.length; index += 1) {
          if (orders[index]._id.toString() === orderId) {
            return res.json({
              error: false,
              message: 'Lista de ordenes',
              order: orders[index]
            });
          }
        }
      }
      return res
        .status(400)
        .json({ error: true, message: 'No encontro el usuario' });
    });
  },
  createOrder(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: true,
        message: 'No se puede realizar orden encontrar usuario'
      });
    }

    User.findOne({ _id: id })
      .then(user => {
        if (user) {
          const { cart, orders } = user;
          const now = new Date();
          if (cart.items.length < 1)
            return res.status(400).json({
              error: true,
              message: `El carrito de compras eta vacio`
            });

          const order = new Order({
            items: cart.items,
            status: 'Pending',
            date: now
          });

          orders.push(order);
          cart.items = [];
        }
        user
          .save()
          .then(result => {
            return res.json({
              error: false,
              message: 'Lista de ordenes',
              result
            });
          })
          .catch(err => {
            return res
              .status(400)
              .json({ error: true, message: `No producto` });
          });
      })
      .catch(err => {
        return res
          .status(400)
          .json({ error: true, message: `No se pudo agregar el producto` });
      });
  },
  cancelOrder(req, res) {
    const { id, orderId } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: 'Especifique el usuario' });
    }
    User.findOne({ _id: id }).then(user => {
      if (user) {
        const { orders } = user;
        if (orders.length < 1) {
          return res
            .status(400)
            .json({ error: true, message: 'No hay ordenes' });
        }
        for (let index = 0; index < orders.length; index += 1) {
          if (orders[index]._id.toString() === orderId) {
            orders[index].status = 'Cancelled';
            return res.json({
              error: false,
              message: 'Lista de ordenes',
              order: orders[index]
            });
          }
        }
      }
      return res
        .status(400)
        .json({ error: true, message: 'No encontro el usuario' });
    });
  },
  completeOrder(req, res) {
    const { id, orderId } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: true, message: 'Especifique el usuario' });
    }
    User.findOne({ _id: id }).then(user => {
      if (user) {
        const { orders } = user;
        if (orders.length < 1) {
          return res
            .status(400)
            .json({ error: true, message: 'No hay ordenes' });
        }
        for (let index = 0; index < orders.length; index += 1) {
          if (orders[index]._id.toString() === orderId) {
            orders[index].status = 'Completed';
            return res.json({
              error: false,
              message: 'Lista de ordenes',
              order: orders[index]
            });
          }
        }
      }
      return res
        .status(400)
        .json({ error: true, message: 'No encontro el usuario' });
    });
  },
  updateOrder(req, res) {},
  deleteOrder(req, res) {}
};

module.exports = orderController;
