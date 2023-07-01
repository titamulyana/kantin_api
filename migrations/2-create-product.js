'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        unique: 'unique_name_type',
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        unique: 'unique_name_type',
      },
      price: {
        type: Sequelize.INTEGER,
      },

      type: {
        type: Sequelize.ENUM('minuman', 'makanan'),
        unique: 'unique_name_type',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      softdelete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });

    await queryInterface.addConstraint('Products', {
      fields: ['name', 'type', 'userId'],
      type: 'unique',
      name: 'unique_name_type',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Products',
      'unique_name_type'
    );
    await queryInterface.dropTable('Products');
  },
};
