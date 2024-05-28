// module.exports = (sequelize, DataTypes) => {
//     const PostHashtag =  sequelize.define('PostHashtag',{
        
//     },{
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci'
//     });
//     PostHashtag.associate = (db) => {
//         db.PostHashtag.belongsTo(db.Post);
//         db.PostHashtag.belongsTo(db.Hashtag);
//     };
//     return PostHashtag;
// }