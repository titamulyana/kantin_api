'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      salesId: {
        // unique: 'unique_sales',
        unique: true,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      tabelNumber: {
        unique: 'unique_sales',
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('done', 'not done'),
        defaultValue: 'not done',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.addConstraint('Transactions', {
    //   fields: ['tabelNumber', 'salesId'],
    //   type: 'unique',
    //   name: 'unique_sales',
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  },
};
