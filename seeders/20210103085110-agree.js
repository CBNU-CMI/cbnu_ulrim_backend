'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date()
    const agrees = [
      {
        userId: 1,
        petitionId: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        petitionId: 2,
        createdAt: now,
        updatedAt: now,
      },
    ]

    return queryInterface.bulkInsert('agrees', agrees, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
