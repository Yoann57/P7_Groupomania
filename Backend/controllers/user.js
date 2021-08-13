const bcrypt = require('bcrypt');

const User = require('../models/User');

const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces();

exports.signup = async (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    return res.status(500).json({
      error: 'mot de pass incomplet'
    })
  }
  
    // bcrypt.hash(req.body.password, 10)
    //   .then(hash => {
    //     const user = new User({
    //       email: req.body.email,
    //       name: req.body.name,
    //       password: hash
    //     });
    //     user.save()
    //       .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    //       .catch(error => res.status(400).json({ error }));
    //   })
    //   .catch(error => res.status(500).json({ error }));

    try {
      let hash = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash
      });
    } catch (error) {
      res.status(500).json({ error })
    }

    try {
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé !' })
    } catch (error) {
      res.status(400).json({ error })
    }
    
  };

  exports.login = async (req, res, next) => {
    console.log("reponse ok");
    // User.findOne({ email: req.body.email })
    //   .then(user => {
    //     if (!user) {
    //       return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    //     }
    //     bcrypt.compare(req.body.password, user.password)
    //       .then(valid => {
    //         if (!valid) {
    //           return res.status(401).json({ error: 'Mot de passe incorrect !' });
    //         }
    //         res.status(200).json({
    //           userId: user._id,
    //           token: jwt.sign(
    //             { userId: user._id },
    //             'RANDOM_TOKEN_SECRET',
    //             { expiresIn: '24h' }
    //           )
    //         });
    //       })
    //       .catch(error => res.status(500).json({ error }));
    //   })
    //   .catch(error => res.status(500).json({ error }));

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
      });
    } catch (error) {
      res.status(500).json({ error })
    }
  
  };