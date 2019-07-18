const mongoose = require('mongoose');

const { Schema } = mongoose;
const model = mongoose.model.bind(mongoose);
const { ObjectId } = mongoose.Schema.Types;

const productSchema = Schema({
  id: ObjectId,
  name: String,
  image: String,
  price: Number,
  description: String,
  tags: [{ type: ObjectId, ref: 'Tag' }]
});

const tagSchema = Schema({
  id: ObjectId,
  name: { type: String, uppercase: true }
});

const Product = model('Product', productSchema);
const Tag = model('Tag', tagSchema);

module.exports = { Product, Tag };
