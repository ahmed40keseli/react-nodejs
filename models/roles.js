const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Role = sequelize.define('Role',
  {
    roleId:{
      type : DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false, // createdAt ve updatedAt sütunları oluşturulmaz
  }
);

module.exports = Role;