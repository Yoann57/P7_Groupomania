const fs = require('fs');
const db = require('../models');
const Comment = db.comment;
const User = db.user;

exports.addComment = (req, res, next) => {

  const postId = req.params.id;

  const comment = Comment.create({
    include: [{
      model: db.user,
      attributes: ["username"],
    }, ],

    userId: req.body.userId,
    postId,
    commentaire: req.body.commentaire,
  });
  comment
    .then(() => res.status(201).json({
      message: "Votre commentaire a été publié"
    }))
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau"
      })
    })
}

exports.getAllComments = (req, res) => {

  Comment.findAll({
      include: [{
        model: db.user,
        attributes: ["username"],
      }, ],
    })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneComment = (req, res, next) => {

  Comment.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.user,
      attributes: ["username"],
    }, ],

  }).then(
    (comment) => {
      res.status(200).json(comment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.deleteComment = (req, res, next) => {

  Comment.findOne({
      where: {
        id: req.params.id
      },
    })
    .then((comment) => {
      User.findOne({
          where: {
            id: req.userId,
          },
        })
        .then((user) => {
          if (req.userId == comment.userId || user.isAdmin === true) {
            comment.destroy()
            return res.status(200).json({
              response: "ok",
            })
          } else {
            return res.status(403).json({
              error: "UnAuthorize",

            });
          }
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    });

}