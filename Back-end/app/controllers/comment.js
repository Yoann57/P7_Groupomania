const fs = require('fs');
const db = require('../models');
const Comment = db.comment;
const User = db.user;

exports.addComment = (req, res, next) => {

  // const Comment = models.comment;

  const PostId = req.params.id;
  console.log(req.body.userId);
  console.log(PostId);
  console.log(req.body.comment);

  const comment = Comment.create({
    userId: req.body.userId,
    PostId: PostId,
    comment: req.body.comment,
    // message: comment.message

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

  const Comment = models.comment;
  const commentObject = req.body.comment;

  Comment.findOne({
    where: {
      id: req.params.id
    }
  }).then((comment) => {
    if (req.userId == comment.userId || req.userRole === 1) {
      comment.message = commentObject.message;
    }
    comment.save()
      .then((e) => {
        res.status(200).json({
          message: 'Commentaire modifié !'
        })
      })
      .catch(error => res.status(400).json({
        error
      }));
  });
}

exports.deleteComment = (req, res, next) => {


  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(response => {
      if (req.userId == Comment.userId || req.userRole === 1) {
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