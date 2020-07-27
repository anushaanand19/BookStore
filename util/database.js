const Sequelize = require("sequelize");

const sequelize = new Sequelize("Node-practice", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
