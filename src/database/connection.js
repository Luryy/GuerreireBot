const knex = require('knex');
const path = require('path')

const dotenv = require('dotenv'); //should find a way to remove
dotenv.config();

const connection = knex({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_SENHA,
      database : process.env.DB
    },
    migrations:{
      directory: path.resolve(__dirname, 'migrations')
    },
    useNullAsDefault: true,
  });

  module.exports = connection;