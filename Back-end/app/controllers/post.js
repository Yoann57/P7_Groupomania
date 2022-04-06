const fs = require("fs");
const db = require("../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;


exports.createPost = (req, res, next) => {

  const post = Post.create({
    include: [{
      model: db.user,
      attributes: ["username"],
    }, ],
    text: req.body.text,
    userId: req.body.userId,
    file: req.file ?
      `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null,
  });
  post
    .then((newPost) =>

      res.status(201).json(newPost))
    .catch((error) => {
      console.error(error)
      res.status(400).json({
        error,
      })
    });
};

exports.modifyPost = (req, res, next) => {

    Post.findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((post) => {
        User.findOne({
            where: {
              id: req.userId,
            },
          })
          .then((user) => {

            if (req.userId == post.userId || user.isAdmin === true) {
              const dataToUpdate = {
                text: req.body.text,
              };
              if (req.file) {
                dataToUpdate.file = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
              }
              Post.update(dataToUpdate, {
                  where: {
                    id: req.params.id,
                  },
                })
                .then((response) =>
                  res.status(200).json({
                    response: " Publication modifiée avec succès !",
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
      });
    }

    exports.deletePost = (req, res, next) => {

      Post.findOne({
          where: {
            id: req.params.id,
          },
        })
        .then((post) => {
          User.findOne({
              where: {
                id: req.userId,
              },
            })
            .then((user) => {
              if (req.userId == post.userId || user.isAdmin === true) {

                if (req.file) {
                  dataDestroy.file = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
                }
                console.log(post, "com")

                Comment.findAll({ //suppression des commentaires
                    where: {
                      postId: post.id,
                    },
                  })
                  .then((comments) => {
                    comments.forEach(element => {
                      element.destroy()
                    });
                  })
                post.destroy()
                return res.status(200).json({
                  response: "ok",
                })
              } else {
                return res.status(403).json({
                  error: "UnAuthorize",
                });
              }
            })
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    };

    exports.getOnePost = (req, res, next) => {

      Post.findOne({
          where: {
            id: req.params.id,
          },
          include: [{
            model: db.user,
            attributes: ["username"],
          }, ],
        })
        .then((post) => {
          res.status(200).json(post);
        })
        .catch((error) => {
          res.status(404).json({
            error: error,
          });
        });
    };

    exports.getAllPosts = (req, res, next) => {

      Post.findAll({
          include: [{
            model: db.user,
            attributes: ["username"],
          }, ],
        })
        .then((posts) => {
          res.status(200).json(posts);
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    };
  
