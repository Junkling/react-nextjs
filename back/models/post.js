const DataTypes = require('sequelize');
const {Model} = DataTypes;

module.exports = class Post extends Model{
    static init(sequelize){
        return super.init(
         {content:{
            type: DataTypes.TEXT,
            allowNull: false,
            }
         },{
            modelName: 'Post',
            tableName: 'Posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
         })
    };
    static associate(db){
        db.Post.belongsTo(db.User);
        //리트윗
        db.Post.belongsTo(db.Post,{as: 'Retweet'});
        db.Post.hasMany(db.Comment,{as: 'Comments'});
        db.Post.hasMany(db.Image,{as: 'Images'});

        db.Post.belongsToMany(db.Hashtag,{through: 'PostHashtag'});
        // 중간테이블을 직접 만들어서 더 의미 있게 쓸 수 있지만 예제에서 뺴겠음
        // db.Post.hasMany(db.PostHashtag);

        db.Post.belongsToMany(db.User, {through: 'Heart', as: 'Hearters'})
    };
}

// module.exports = (sequelize, DataTypes) => {
//     const Post =  sequelize.define('Post',{
//         content: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//     },{
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci'
//     });
//     Post.associate = (db) => {
//         db.Post.belongsTo(db.User);
//         //리트윗
//         db.Post.belongsTo(db.Post,{as: 'Retweet'});
//         db.Post.hasMany(db.Comment,{as: 'Comments'});
//         db.Post.hasMany(db.Image,{as: 'Images'});

//         db.Post.belongsToMany(db.Hashtag,{through: 'PostHashtag'});
//         // 중간테이블을 직접 만들어서 더 의미 있게 쓸 수 있지만 예제에서 뺴겠음
//         // db.Post.hasMany(db.PostHashtag);

//         db.Post.belongsToMany(db.User, {through: 'Heart', as: 'Hearters'})
//     };
//     return Post;
// }