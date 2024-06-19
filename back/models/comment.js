const DataTypes = require('sequelize');
//최신 문법
const {Model} = DataTypes
module.exports = class Comment extends Model {
    static init(sequelize){
        return super.init({
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },{
            modelName: 'Comment',
            tableName: 'Comments',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
}
// 과거 문법
// module.exports = (sequelize, DataTypes) => {
//     const Comment =  sequelize.define('Comment',{
//         content: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//     },{
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci'
//     });
//     Comment.associate = (db) => {
//         db.Comment.belongsTo(db.User);
//         db.Comment.belongsTo(db.Post);
//     };
//     return Comment;
// }