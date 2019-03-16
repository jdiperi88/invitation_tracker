const Sequelize = require("sequelize");
const dbName = "invitation_db";

const db = new Sequelize({
  database: dbName,
  host:
    process.env.DATABASE_URL ||
    "postgres://yzrzkssrdczgnh:57b6b2ad617112eb34bd2f454817fc7715d333a1188595219a33879ced636d84@ec2-54-225-95-183.compute-1.amazonaws.com:5432/dvmovnjbhm2uo",
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
