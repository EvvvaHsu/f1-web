'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productcategories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })

    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const products = await queryInterface.sequelize.query(
      'SELECT id FROM Products',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    await queryInterface.bulkInsert('Productcategories', [{
      product_id: products[0].id,
      category_id: categories[0].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[1].id,
      category_id: categories[1].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[2].id,
      category_id: categories[2].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[3].id,
      category_id: categories[2].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[4].id,
      category_id: categories[2].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[5].id,
      category_id: categories[2].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[6].id,
      category_id: categories[3].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[7].id,
      category_id: categories[4].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[8].id,
      category_id: categories[4].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[9].id,
      category_id: categories[5].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[10].id,
      category_id: categories[5].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[11].id,
      category_id: categories[6].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[12].id,
      category_id: categories[7].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[13].id,
      category_id: categories[8].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: products[14].id,
      category_id: categories[9].id,
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productcategories', null, {})
  }
}
