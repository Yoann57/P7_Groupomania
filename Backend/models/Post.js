const Sequelize = require('sequelize');
const sequelize = require('../middleware/sequelize.js');

const Post = sequelize.define('post', {
    text: {type: Sequelize.STRING},
    file: {type: Sequelize.STRING}
});



module.exports = Post;