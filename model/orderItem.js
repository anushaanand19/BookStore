const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const orderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Quantity: Sequelize.INTEGER,
});

module.exports = orderItem;
