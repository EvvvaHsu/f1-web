'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      firstname: 'root',
      lastname: 'admin',
      email: 'admin@example.com',
      passhash: await bcrypt.hash('12345678', 10),
      is_admin: true,
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      birthday: faker.date.between('1970-01-01', '2000-01-01'),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      firstname: 'user1',
      lastname: 'user',
      email: 'user1@example.com',
      passhash: await bcrypt.hash('12345678', 10),
      is_admin: false,
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      birthday: faker.date.between('1970-01-01', '2000-01-01'),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      firstname: 'user2',
      lastname: 'user',
      email: 'user2@example.com',
      passhash: await bcrypt.hash('12345678', 10),
      is_admin: false,
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      birthday: faker.date.between('1970-01-01', '2000-01-01'),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
