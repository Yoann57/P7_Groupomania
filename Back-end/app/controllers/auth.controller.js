const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: false
  })
  res.send({
    message: "User was registered successfully!"
  });
};

exports.signin = (req, res) => {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      let token = jwt.sign({
        id: user.id
      }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        isAdmin: user.isAdmin
      });
    });
};