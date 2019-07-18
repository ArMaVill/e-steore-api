const schema = require('../model/product');

const { Tag } = schema;

const tagController = {
  all(req, res) {
    Tag.find({}).exec((err, tags) => res.json(tags));
  },
  find(req, res) {
    const { id } = req.params;
    Tag.findOne({ _id: id }, (err, tag) => {
      if (tag) return res.json(tag);
      return res.status(400).json({ message: 'No se encontro esa categoria' });
    });
  },
  create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }

    Tag.findOne({ name }).then(tag => {
      if (tag) {
        return res
          .status(400)
          .json({ message: `La Categoria "${name}" ya existe` });
      }
      const newTag = new Tag({ name });
      newTag.save().then(tag => {
        return res.json({ tag });
      });
    });
  },
  update(req, res) {
    const idParam = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    Tag.findOne({ _id: idParam }, (err, tag) => {
      if (tag) {
        tag.name = name;
        tag.save((err, updated) => res.json(updated));
      } else {
        return res.status(400).json({ message: 'No se encontro categoria' });
      }
    });
  },
  delete(req, res) {
    const { id } = req.params;
    Tag.findOne({ _id: id }, (err, tag) => {
      if (tag) {
        Tag.deleteOne({ _id: id }, (err, removed) => res.json(removed));
      } else {
        return res.status(400).json({ message: 'No se encontro categoria' });
      }
    });
  }
};

module.exports = tagController;
