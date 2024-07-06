'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Payments.belongsTo(models.Orders, {
        foreignKey: 'orderId',
        as: 'order'
      })
    }
  }
  Payments.init({
    orderId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    amount: DataTypes.STRING,
    paidAt: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Payments',
    tableName: 'Payments',
    underscored: true
  })
  return Payments
}
