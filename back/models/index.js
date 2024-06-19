const Sequelize = require('sequelize');
const user = require('./user');
const post = require('./post');
const hashtag = require('./hashtag');
const comment = require('./comment');
const image = require('./image');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//최신 문법
db.User = user;
db.Post = post;
db.Hashtag = hashtag;
db.Comment = comment;
db.Image = image;
Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
})
// db.User = require('./user')(sequelize, Sequelize)
// db.Post = require('./post')(sequelize, Sequelize)
// db.Hashtag = require('./hashtag')(sequelize, Sequelize)
// db.Comment = require('./comment')(sequelize, Sequelize)
// db.Image = require('./image')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
