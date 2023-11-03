'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
    await queryInterface.bulkInsert('Categories', ['Mercedes', 'Haas', 'Red bull', 'Alpine', 'McLaren', 'Ferrari', 'Alfa Romeo', 'Alpha Tauri', 'Williams', 'Aston Martin', 'Lewis Hamilton', 'George Russell', 'Max Verstappen', 'Sergio Perez', 'Charles Leclerc', 'Carlos Sainz', 'Lando Norris', 'Oscar Piastri', 'Yuki Tsunoda', 'Daniel Ricciardo', 'Esteban Ocon', 'Pierre Gasly', 'Valtteri Bottas', 'Zhou Guanyu', 'Lance Stroll', 'Fernando Alonso', 'Nico Hulkenberg', 'Kevin Magnussen', 'Alexander Albon', 'Logan Sargeant', 'Men', 'Women', 'Kids', 'Others'].map(item => {
      return {
        name: item,
        created_at: new Date(),
        updated_at: new Date()
      }
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {})
  }
}
