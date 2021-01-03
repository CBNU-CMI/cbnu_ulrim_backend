'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date()
    const salt = bcrypt.genSaltSync()
    
    const users = [
      {
        email: 'abc123@naver.com',
        password: bcrypt.hashSync('qwer1234', salt),
        createdAt: now,
        updatedAt: now,
      },
    ]

    return queryInterface.bulkInsert('users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
