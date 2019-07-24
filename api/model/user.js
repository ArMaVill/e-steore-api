const mongoose = require('mongoose');

const { Schema } = mongoose;
const model = mongoose.model.bind(mongoose);
const { ObjectId } = mongoose.Schema.Types;

const addressSchema = Schema({
  city: String,
  line1: String,
  province: String
});

const userSchema = Schema({
  id: ObjectId,
  username: String,
  password: String,
  email: String,
  cart: [
    {
      product: { type: ObjectId, ref: 'Product' },
      quantity: Number,
      total: Number
    }
  ],
  orders: [
    {
      id: ObjectId,
      items: [[]],
      date: Date,
      status: String,
      total: Number
    }
  ],
  address: { type: ObjectId, ref: 'Address' }
});

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
const Address = model('Address', addressSchema);
const User = model('User', userSchema);

module.exports = { User, Address, Product, Tag };
