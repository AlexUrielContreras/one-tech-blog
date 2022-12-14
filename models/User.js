const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
const bcrypt = require('bcrypt');

class User extends Model{
    checkPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password)    
    }
};

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
        unique: true,
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
                msg: 'Password must be between 4 and 20 characters long'
            }
        }
    }
},
{
    hooks: {
        
        async beforeCreate(dbUserData) {
            return dbUserData.password = await bcrypt.hash(dbUserData.password, 10);
        },

        async beforeUpdate(dbUserData){
            return dbUserData.password = await bcrypt.hash(dbUserData.password, 10);
        }
    },
    sequelize,
    // disables the creation of createdAt and updatedAt
    timestamps: false,
    // stops the auto pluralization of model name by sequelize
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;