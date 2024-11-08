const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', 
  {
    userId: {
      type : DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey: true
    },
    username: {  
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
          type:DataTypes.STRING,
          allowNull: false
    },
    user_password:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    referansNo:{
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  },
);

module.exports = User;