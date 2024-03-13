const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const Page = sequelize.define('Page', {
    id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'https://placehold.jp/800x600.png'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: 'page',
    createdAt: false,
    updatedAt: false
});

Page.sync();
module.exports = Page;