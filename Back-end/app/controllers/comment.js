const fs = require('fs');
const db = require('../models');
const Comment = db.comment;
const User = db.user;
const Post = db.post;

exports.addComment = (req, res, next) => {

  const PostId = req.params.id;
  console.log(req.body.userId);
  console.log(PostId);
  console.log(req.body.comment);

  const comment = Comment.create({
    userId: req.body.userId,
    PostId: PostId,
    comment: req.body.comment,
  });
  comment
    .then(() => res.status(201).json({
      message: "Votre commentaire a été publié"
    }))
    .catch(error => {
      console.error(error);
      res.status(500).json({
          error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau"
        }
      )})
}

exports.getAllComments = (req, res) => {
  const PostId = req.params.id;
  Comment.findAll({
    // where: {
    //   PostId: PostId
    // },
      // include: [{
      // model: PostId
      // },]
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
    // include: [{
    //   model: User
    // }, ]

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

exports.modifyComment = (req, res, next) => {


  Comment.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((comment) => {
      if (req.userId == comment.UserId) {
        const dataToUpdate = {
          comment: req.body.comment,
        };
        Comment.update(dataToUpdate, {
          where: {
            id: req.params.id,
          },
        })
          .then((response) =>
            res.status(200).json({
              response: " Commentaire modifié avec succès !",
            })
          )
          .catch((err) =>
            res.status(401).json({
              err,
            })
          );
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
};

exports.deleteComment = (req, res, next) => {


  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(response => {
      if (req.userId == Comment.userId) {
        if (response > 0) {
          res.status(200).json({
            message: "Le commentaire a été supprimé"
          });
        } else {
          res.status(400).json({
            error: "Ce commentaire n'existe pas"
          });
        }
      }
    })
    .catch(error => res.status(500).json({
      error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau"
    }))
};