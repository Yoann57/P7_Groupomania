module.exports = (sequelize, Datatypes) => {
    const comment = sequelize.define('Comment', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        commentaire: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        userId:{
            type: Datatypes.INTEGER,
        },
        postId:{
            type: Datatypes.INTEGER
        },
        
    });
    comment.associate = (models) => {
        comment.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
          })
        , {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
       }
       comment.belongsTo(models.Post, {
        onDelete: 'cascade',
        foreignKey: { name: 'postId', allowNull: false },
        hooks: true });
    }
    return comment;
}