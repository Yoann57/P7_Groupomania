const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.post = require("../models/Post.js")(sequelize, Sequelize);
db.comment = require("../models/Comment.js")(sequelize, Sequelize);

// db.user.hasMany(db.role);
// db.user.belongsToMany(db.role);
// db.user.hasMany(db.comment);
// db.user.hasMany(db.post);
// db.post.hasMany(db.comment);
// db.post.belongsTo(db.user);
// db.comment.belongsTo(db.user);
// db.comment.belongsTo(db.post);
// db.role.belongsToMany(db.user);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
// db.user.hasMany(db.comment);

// db.user.hasMany(db.post);
// db.post.hasMany(db.comment);
// db.post.belongsTo(db.user);
// db.comment.belongsTo(db.user);
// db.comment.belongsTo(db.post);

// db.comment.belongsTo(db.user, {
//   onDelete: 'cascade',
//   foreignKey: { name: 'userId', allowNull: false },
//   hooks: true });
// db.comment.belongsTo(db.post, {
//   onDelete: 'cascade',
//   foreignKey: { name: 'postId', allowNull: false },
//   hooks: true });

db.ROLES = ["user", "admin"];

module.exports = db;