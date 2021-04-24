'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transactions_types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    transaction__type: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transactions_types',
    underscored: true,
   
  });
  return transactions_types;
};