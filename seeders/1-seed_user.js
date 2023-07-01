'use strict';
const { hashPassword } = require('../helpers/index.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password1 = hashPassword('password1');
    const password2 = hashPassword('password2');
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          canteenName: 'Canteen 1',
          username: 'user1',
          password: password1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          canteenName: 'Canteen 2',
          username: 'user2',
          password: password2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more user data here...
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
