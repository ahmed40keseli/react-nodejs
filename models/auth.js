const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Role = require('./roles.js')

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
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,  // Role table
        key: 'roleId', // Reference the 'roleId' in Role table
      }
    }
  },{
    timestamps: false,
  }
);

User.belongsTo(Role, {
  foreignKey: 'roleId',
  onDelete: 'CASCADE',
});

module.exports = User;