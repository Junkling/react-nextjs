const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SCHEMA,
    "host": process.env.DB_URL,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "1234",
    "database": "node-bird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "1234",
    "database": "node-bird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
