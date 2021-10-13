module.exports = (sequelize, Datatypes) => {
    const post = sequelize.define('post', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        text: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        file: {
            type: Datatypes.STRING,
            allowNull: true
        }
    });
    post.associate = (models) => {
        post.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }, onDelete: 'CASCADE'
        })
        post.hasMany(models.Like)
        post.hasMany(models.Comment)
    }
    return post;
}