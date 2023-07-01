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
      'Products',
      [
        // Data untuk userId: 1
        {
          userId: 1,
          name: 'Nasi Goreng',
          price: 15000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Sate Ayam',
          price: 12000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Ayam Bakar',
          price: 10000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Rendang',
          price: 18000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Soto Ayam',
          price: 13000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Gado-gado',
          price: 10000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Nasi Padang',
          price: 20000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Bakso',
          price: 12000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Mie Ayam',
          price: 10000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 1,
          name: 'Nasi Uduk',
          price: 10000,
          type: 'makanan',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        // Data untuk userId: 2
        {
          userId: 2,
          name: 'Es Teh Manis',
          price: 3000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Kopi Susu',
          price: 5000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Es Campur',
          price: 7000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Jus Alpukat',
          price: 10000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Teh Tarik',
          price: 6000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Es Jeruk',
          price: 5000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Jus Mangga',
          price: 8000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Cappuccino',
          price: 12000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Teh Hijau',
          price: 4000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
        {
          userId: 2,
          name: 'Soda Gembira',
          price: 9000,
          type: 'minuman',
          createdAt: new Date(),
          updatedAt: new Date(),
          softdelete: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
