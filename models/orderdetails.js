'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Orderdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Orderdetails.belongsTo(models.Orders, {
        foreignKey: 'orderId',
        as: 'orders'
      })
    }
  }
  Orderdetails.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    name: DataTypes.STRING,
    paymentstatus: DataTypes.STRING,
    shippingstatus: DataTypes.STRING,
    address: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orderdetails',
    tableName: 'Orderdetails',
    underscored: true
  })
  return Orderdetails
}
