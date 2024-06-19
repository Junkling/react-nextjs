const DataTypes = require('sequelize');
const {Model} = DataTypes

module.exports = class User extends Model{
    static init(sequelize){
        return super.init(
            {
             email: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
             }, 
             nickname : {
                type: DataTypes.STRING(20),
                allowNull: false,
             },
             password: {
                 type: DataTypes.STRING(100),
                 allowNull: false,
             },
            },{
             modelName: 'User',
             tableName: 'Users',
             charset: 'utf8',
             collate: 'utf8_general_ci',
             sequelize,
            }
        )
    };
    static associate(db){
        db.User.hasMany(db.Post,{as: 'Posts'});
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through: 'Heart', as: 'Hearted'})
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'})
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'})
    }
}

// module.exports = (sequelize, DataTypes) => {
//     const User =  sequelize.define('User',{
//         email: {
//             type: DataTypes.STRING(30),
//             allowNull: false,
//             unique: true,
//         },
//         nickname : {
//             type: DataTypes.STRING(20),
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         },
//     },{
//         charset: 'utf8',
//         collate: 'utf8_general_ci'
//     });
//     User.associate = (db) => {
//         db.User.hasMany(db.Post,{as: 'Posts'});
//         db.User.hasMany(db.Comment);
//         db.User.belongsToMany(db.Post, {through: 'Heart', as: 'Hearted'})
//         db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'})
//         db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'})
//     };
//     return User;
// }