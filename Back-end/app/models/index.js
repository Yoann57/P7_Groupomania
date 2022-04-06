const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+01:00',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.post = require("../models/Post.js")(sequelize, Sequelize);
db.comment = require("../models/Comment.js")(sequelize, Sequelize);

db.user.hasMany(db.comment);
db.user.hasMany(db.post);
db.post.hasMany(db.comment);
db.post.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.comment.belongsTo(db.post);

module.exports = db;