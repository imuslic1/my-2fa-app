const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Secret za Google Authenticator
    twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Token za privremenu verifikaciju
    tempToken: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Vrijeme isticanja tempTokena
    tempTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true
    }  
}, {
    timestamps: true
});

module.exports = User;