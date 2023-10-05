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
      // define association here
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
