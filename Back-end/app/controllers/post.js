const fs = require("fs");

const db = require("../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;

exports.createPost = (req, res, next) => {

  const post = Post.create({
    text: req.body.text,
    userId: req.body.userId,
    username:req.body.username,
    file: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
    
  },
  );

  post
    .then((newPost) =>
    
    res.status(201).json(newPost))
    .catch((error) =>{
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
      if (req.userId == post.UserId) {
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
};

exports.deletePost = (req, res, next) => {
  

  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (req.userId == post.UserId || isAdmin === 1) {
        
        if (req.file) {
          dataDestroy.file = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }
          post.destroy()
      return res.status(200).json({
        response:"ok",
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
};

exports.getOnePost = (req, res, next) => {
  

  Post.findOne({
    where: {
      id: req.params.id,
    },
    // include: [
    //   {
    //     model: User,
    //   },
    // ],
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

// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await db.post.findAll({
     
//       include: [
//         {
//           model: Comment
//         },
//       ],
//     });
//     res.status(200).send(posts);
//   } catch (error) {
//     return res.status(500).send({
//       error: "Une erreur est survenu lors de la récupération des posts ",
//     });
//   }
// };

exports.getAllPosts = (req, res, next) => {

 
  
  Post.findAll({
//   include: [
//     { 
//     model: Comment
//   },
// ],
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

exports.likePost = async (req, res, next) => {
  const Like = models.Like;
  const PostId = req.params.id;

  try {
    const previousLike = await Like.findOne({
      where: {
        userId: req.userId,
        PostId: PostId,
      },
    });

    if (!previousLike) {
      const response = await Like.create({
        userId: req.userId,
        PostId: PostId,
      });
      return res.status(201).json({
        message: "Votre like a été ajouté",
      });
    }

    if (previousLike) {
      await Like.destroy({
        where: {
          UserId: req.userId,
          PostId: PostId,
        },
      });
      return res.status(200).json({
        message: "Votre like a été retiré",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error:
        "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau",
    });
  }
};
