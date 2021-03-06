module.exports = (sequelize, Datatypes) => {
    const post = sequelize.define('post', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        file: {
            type: Datatypes.STRING,
            allowNull: true
        },
      
    });
    post.associate = (models) => {
        post.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
          })
        , {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
       }
                post.hasMany(models.Comment)
    }
    return post;
}