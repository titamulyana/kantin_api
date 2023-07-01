'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Sales',
      [
        // Data untuk userId: 1
        {
          salesId: 'S01-001',
          userId: 1,
          productId: 1,
          qty: 2,
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-002',
          userId: 1,
          productId: 2,
          qty: 1,
          price: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-003',
          userId: 1,
          productId: 3,
          qty: 3,
          price: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-004',
          userId: 1,
          productId: 4,
          qty: 2,
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-005',
          userId: 1,
          productId: 5,
          qty: 1,
          price: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Data untuk userId: 2
        {
          salesId: 'S02-001',
          userId: 2,
          productId: 6,
          qty: 2,
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-002',
          userId: 2,
          productId: 7,
          qty: 1,
          price: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-003',
          userId: 2,
          productId: 8,
          qty: 3,
          price: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-004',
          userId: 2,
          productId: 9,
          qty: 2,
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-005',
          userId: 2,
          productId: 10,
          qty: 1,
          price: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
