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
      allowNull: true,
      references: {
        model: Role,
        key: 'roleId',
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
// farklı bir tablodan verileri bu tabloya çeker sütun oluşturulur

module.exports = User;

// tüm veritabanı şeması burada oluşturulur buradan değiştirilebilir