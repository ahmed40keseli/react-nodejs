const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

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
      allowNull:false,
      type:DataTypes.BOOLEAN
    }
  },
);

module.exports = Task;