'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Product.belongsToMany(models.Category, {
        through: 'Productcategory',
        foreignKey: 'productId',
        as: 'Categoriedproducts'
      })
      Product.hasMany(models.Cartdetails, {
        foreignKey: 'productId',
        as: 'ProductCartdetails'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    amount: DataTypes.STRING,
    stock: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.TEXT,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  return Product
}
