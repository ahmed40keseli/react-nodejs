const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Task = sequelize.define('Task',
  {
    taskId:{
      type : DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {  
      type: DataTypes.TEXT,
      allowNull:true
    },
    completed:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    assignProfile:{
      type : DataTypes.STRING,
      allowNull:false,
    },
    endDate:{
      type : DataTypes.DATE,
      allowNull:true,
    },
    reminderDate:{
      type : DataTypes.DATE,
      allowNull:true,
    }
  },
);

module.exports = Task;