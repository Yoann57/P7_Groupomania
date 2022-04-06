const db = require("../models");
const User = db.user;

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.deleteUser = (req, res, next) => {

    User.findOne({
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        if (req.userId == req.params.id) {
          user.destroy()
            .then(() => res.status(200).json({
              message: 'Utilisateur supprimé'
            }))
            .catch(error => res.status(400).json({
              error
            }));
        } else {
          res.status(403).json({
            'error': 'UnAuthorize'
          })
        }
      })
  };
  exports.getOneUser = (req, res, next) => {

    User.findOne({
      where: {
        id: req.params.id
      }
    }).then(
      (user) => {
        if (req.userId == req.params.id) {
          return res.status(200).json(user);
        } else {
          return res.status(403).json("");
        }
      }
    ).catch(
      (error) => {
        return res.status(400).json({
          error: error
        });
      }
    );
  };
