'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date()
    const petitions = [
      {
        userId: 1,
        title: 'title1',
        category: 'class',
        content: 'content1',
        dueDate: now.setDate(now.getDate + 3),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        title: 'title2',
        category: 'class',
        content: 'content2',
        dueDate: now.setDate(now.getDate + 4),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        title: 'title3',
        category: 'class',
        content: 'content3',
        dueDate: now.setDate(now.getDate + 5),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        title: 'title4',
        category: 'class',
        content: 'content4',
        dueDate: now.setDate(now.getDate + 6),
        createdAt: now,
        updatedAt: now,
      },
    ]

    return queryInterface.bulkInsert('petitions', petitions, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
