const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    }
},
{
    tableName: 'category',
    createdAt: false,
    updatedAt: false
});

Category.sync();
module.exports = Category;