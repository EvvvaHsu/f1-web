'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Orders.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      Orders.hasMany(models.Orderdetails, {
        foreignKey: 'orderId',
        as: 'orderdetails'
      })
      Orders.hasMany(models.Payments, {
        foreignKey: 'orderId',
        as: 'payments'
      })
    }
  }
  Orders.init({
    userId: DataTypes.INTEGER,
    ponumber: DataTypes.STRING,
    amount: DataTypes.STRING,
    paymentstatus: DataTypes.STRING,
    shippingstatus: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
    tableName: 'Orders',
    underscored: true
  })
  return Orders
}
