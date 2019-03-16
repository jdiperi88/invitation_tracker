const Sequelize = require("sequelize");
const dbName = "invitation_db";

let db;
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: match[4],
    host: match[3],
    logging: true //false
  });
} else {
  // the application is executed on the local machine ... use mysql
  db = new Sequelize({
    database: dbName,
    dialect: "postgres",
    define: {
      underscored: true
    }
  });
}

const Recipient = require("./Recipient")(db, Sequelize);
const Survey = require("./Survey")(db, Sequelize);
const User = require("./User")(db, Sequelize);

module.exports = {
  Recipient,
  Survey,
  User,
  db
};
