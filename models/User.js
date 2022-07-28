const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class User extends Model{};

User.init({
    
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, 

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 20],
                meg: 'Password must be between 4 and 20 characters long'
            }
        }
    }
},
{
    sequelize,
    // disables the creation of createdAt and updatedAt
    timestamps: false,
    // stops the auto pluralization of model name by sequelize
    freezeTableName: true,
    underscored: true,
    tableName: 'user'
});

module.exports = User;