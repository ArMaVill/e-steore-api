const bcrypt = require('bcryptjs');
const Model = require('../model/user');

const { User, Cart } = Model;

const userController = {
  all(req, res) {
    User.find().exec((err, user) => res.json(user));
  },
  find(req, res) {
    const { id } = req.params;
    User.findOne({ _id: id })
      .then((user, err) => {
        console.log(err, user);
        if (user) return res.json(user);
        res.status(400).json({ err, msg: `Usuario no encontrado` });
      })
      .catch(err => {
        res.status(400).json({ err, msg: `Usuario no encontrado` });
      });
  },
  update(req, res) {
    const idParam = req.params.id;
    const userReq = req.body;

    User.findOne({ _id: idParam }).then((err, user) => {
      if (user) {
        user.username = userReq.username;
        user.password = userReq.password;
        user.email = userReq.email;
        user.save((err, updated) => res.json(updated));
      }
      return res.status(400).json({ msg: `Usuario no encontrado` });
    });
  },
  delete(req, res) {
    const { id } = req.params;
    User.findOne({ _id: id }, (err, tag) => {
      if (tag) {
        User.deleteOne({ _id: id }, (err, removed) => res.json(removed));
      } else {
        return res
          .status(400)
          .json({ message: 'No se elimino el usuario categoria' });
      }
    });
  },
  register(req, res) {
    const { username, email, password, line1, city, province } = req.body;

    if (!username || !email || !password || line1 || city || province) {
      return res.status(400).json({ msg: 'Faltan datos' });
    }

    User.findOne({ email }).then(user => {
      if (user)
        return res
          .status(400)
          .json({ msg: `El email ${email} ya esta en uso` });

      const newUser = new User({
        username,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            res.json({
              user: {
                id: user._id,
                name: user.username,
                email: user.email
              }
            });
          });
        });
      });
    });
  },
  login(req, res) {
    const requestBody = req.body;
    const newUser = new User(requestBody);

    newUser.save().exec((err, user) => res.json(user));
  },
  logout(req, res) {
    const requestBody = req.body;
    const newUser = new User(requestBody);

    newUser.save((err, user) => res.json(user));
  },
  allAddresses() {}
};

module.exports = userController;
