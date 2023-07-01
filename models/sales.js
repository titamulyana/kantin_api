'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    static associate(models) {
      Sales.belongsTo(models.Transaction, {
        foreignKey: 'salesId',
      });
      Sales.belongsTo(models.User, { foreignKey: 'userId' });
      Sales.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'DataProduct',
      });
      Sales.belongsTo(models.Transaction, {
        foreignKey: 'salesId',
        targetKey: 'salesId',
      });
    }
  }

  Sales.init(
    {
      userId: DataTypes.INTEGER,
      salesId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Sales',
    }
  );

  return Sales;
};
