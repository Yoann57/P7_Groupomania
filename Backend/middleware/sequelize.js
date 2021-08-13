const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize('dbgroupomania', 'root', '574033', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;