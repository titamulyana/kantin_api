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
      'Transactions',
      [
        // Data untuk userId: 1
        {
          salesId: 'S01-001',
          userId: 1,
          tabelNumber: 1,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-002',
          userId: 1,
          tabelNumber: 2,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-003',
          userId: 1,
          tabelNumber: 3,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-004',
          userId: 1,
          tabelNumber: 4,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S01-005',
          userId: 1,
          tabelNumber: 5,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Data untuk userId: 2
        {
          salesId: 'S02-001',
          userId: 2,
          tabelNumber: 6,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-002',
          userId: 2,
          tabelNumber: 7,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-003',
          userId: 2,
          tabelNumber: 8,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-004',
          userId: 2,
          tabelNumber: 9,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          salesId: 'S02-005',
          userId: 2,
          tabelNumber: 10,
          status: 'not done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
