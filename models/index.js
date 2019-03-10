const Sequelize = require("sequelize");
const dbName = "invitation_db";

const db = new Sequelize({
  database: dbName,
  dialect: "postgres",
  define: {
    underscored: true
  }
});

const Recipient = require("./Recipient")(db, Sequelize);
const Survey = require("./Survey")(db, Sequelize);
const User = require("./User")(db, Sequelize);

db.sync();

module.exports = {
  Recipient,
  Survey,
  User
};
