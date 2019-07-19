const mongoose = require('mongoose');

const { Schema } = mongoose;
const model = mongoose.model.bind(mongoose);
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = Schema({
  id: ObjectId,
  status: String,
  items: [{ product: { type: ObjectId, ref: 'Product' }, quantity: Number }]
});

const addressSchema = Schema({
  city: String,
  line1: String,
  line2: String,
  province: String
});

const orderSchema = Schema({
  items: [{ product: { type: ObjectId, ref: 'Product' }, quantity: Number }],
  date: Date,
  status: String
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
  orders: [
    {
      items: [
        { product: { type: ObjectId, ref: 'Product' }, quantity: Number }
      ],
      date: Date,
      status: String
    }
  ],
  address: { type: ObjectId, ref: 'Address' }
});

userSchema.virtual('total').get(() => this.cart.items.count);

const Cart = model('Cart', cartSchema);
const Address = model('Address', addressSchema);
const Order = model('Order', orderSchema);
const User = model('User', userSchema);

module.exports = { User, Cart, Address, Order };
