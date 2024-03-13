const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

sequelize.authenticate()
    .then(() => console.log('Database connection is successful'))
    .catch(err => console.error(err.message));

module.exports = sequelize;