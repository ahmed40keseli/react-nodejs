const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

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
  },
);

module.exports = Role;