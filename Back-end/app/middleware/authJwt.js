const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decodedToken.userId);
          req.userId = decodedToken.id;
          next();
        }
      });
    } else {
      console.log('no token !');
    }
  };
  const authJwt = {
    verifyToken: verifyToken,
  };
module.exports = authJwt;