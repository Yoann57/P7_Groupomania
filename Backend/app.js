const express = require('express');
const userRoutes = require('./routes/user');
const helmet = require("helmet");
const app = express();
const path = require('path');
const postsRoutes = require('./routes/posts.js');

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;