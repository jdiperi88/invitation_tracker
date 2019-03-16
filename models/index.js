const Sequelize = require("sequelize");
const dbName = "invitation_db";

const db = new Sequelize({
  database: dbName,
  host: process.env.DATABASE_URL || "localhost",
  dialect: "postgres",
  define: {
    underscored: true
  }
});

const Recipient = require("./Recipient")(db, Sequelize);
const Survey = require("./Survey")(db, Sequelize);
const User = require("./User")(db, Sequelize);

module.exports = {
  Recipient,
  Survey,
  User,
  db
};
