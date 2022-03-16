module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
       comment: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        userId:{
            type: Datatypes.INTEGER
        },
        postId:{
            type: Datatypes.INTEGER
        },
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
          })
        , {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
       }
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
        })
    }
    return Comment;
}