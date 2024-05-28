module.exports = (sequelize, DataTypes) => {
    const Hashtag =  sequelize.define('Hashtag',{
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});

        // 중간테이블을 직접 만들어서 더 의미 있게 쓸 수 있지만 예제에서 뺴겠음
        // db.Hashtag.hasMany(db.PostHashtag);
    };
    return Hashtag;
}