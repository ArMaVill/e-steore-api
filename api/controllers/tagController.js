const schema = require('../model/schema');

const { Tag } = schema;

const tagController = {
  all(req, res) {
    Tag.find({}).exec((err, tags) => res.json(tags));
  },
  find(req, res) {
    const newTag = new Tag(req.body);
    newTag.save((err, tag) => res.json(tag));
  },
  create(req, res) {
    // logica de create
  },
  update(req, res) {
    // logica de update
  },
  delete(req, res) {
    // logica de delete
  }
};

module.exports = tagController;
