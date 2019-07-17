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
  name: String
});

const cartSchema = Schema({
  status: String,
  items: [{ type: ObjectId, ref: 'Product' }]
});

const addressSchema = Schema({
  city: String,
  line1: String,
  line2: String
});

const userSchema = Schema({
  id: ObjectId,
  username: String,
  password: String,
  email: String,
  cart: {
    type: cartSchema,
    default: {
      status: 'active',
      items: []
    }
  },
  orders: [{ type: ObjectId, ref: 'Cart' }],
  address: [{ type: ObjectId, ref: 'Address' }]
});

userSchema.virtual('total').get(() => this.cart.items.count);

const Product = model('Product', productSchema);
const Tag = model('Tag', tagSchema);
const Address = model('Address', addressSchema);
const User = model('Manufacturer', userSchema);

module.exports = { Product, Address, Tag, User };
