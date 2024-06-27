'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cartdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Cartdetails.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'CartdetailsProduct'
      })
    }
  }
  Cartdetails.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    amount: DataTypes.NUMBER,
    quantity: DataTypes.INTEGER,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cartdetails',
    tableName: 'Cartdetails',
    underscored: true
  })
  return Cartdetails
}
