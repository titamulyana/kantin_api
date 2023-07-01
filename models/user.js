'use strict';
const { hashPassword } = require('../helpers/index.js');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Di dalam file model User
      User.hasMany(models.Product, { foreignKey: 'userId' });
      User.hasMany(models.Sales, { foreignKey: 'salesId' });
    }
  }
  User.init(
    {
      canteenName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
    return user;
  });

  User.beforeUpdate((user, options) => {
    user.password = hashPassword(user.password);
    return user;
  });

  return User;
};
