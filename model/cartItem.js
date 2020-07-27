const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const cartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Quantity: Sequelize.INTEGER,
});

module.exports = cartItem;
