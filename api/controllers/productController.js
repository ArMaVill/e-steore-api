const Model = require('../model/product');

const { Product, Tag } = Model;

const productController = {
  all(req, res) {
    Product.find({})
      .populate('tags')
      .exec((err, products) =>
        res.json({ error: false, message: 'Lista de Productos', products })
      );
  },
  find(req, res) {
    const idParam = req.params.id;
    Product.findOne({ _id: idParam })
      .populate('tags')
      .exec((err, product) =>
        res.json({ error: false, message: 'Producto', product })
      );
  },
  create(req, res) {
    const requestBody = req.body;
    const newProduct = new Product(requestBody);

    newProduct.save((err, saved) => {
      Product.findOne({ _id: saved._id })
        .populate('tags')
        .exec((err, product) =>
          res.json({ error: false, message: 'Nuevo Producto creado', product })
        );
    });
  },
  update(req, res) {
    const idParam = req.params.id;
    const product = req.body;

    Product.findOne({ _id: idParam }, (err, data) => {
      data.name = product.name;
      data.description = product.description;
      data.image = product.image;
      data.price = product.price;
      data.tags = product.tags;

      data.save((err, updated) =>
        res.json({ error: false, message: 'Se modifico un Producto', updated })
      );
    });
  },
  delete(req, res) {
    const idParam = req.params.id;
    Product.findOne({ _id: idParam }).remove((err, removed) =>
      res.json({ error: false, message: 'Elimino un Producto', idParam })
    );
  }
};

module.exports = productController;
