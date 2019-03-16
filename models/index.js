const Sequelize = require("sequelize");
const dbName = "invitation_db";
let db;
if (process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL, {
        logging: false,
        dialectOptions: {
            ssl: true /* for SSL config since Heroku gives you this out of the box */
        }
    });
} else {
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

Survey.hasMany(Recipient);
Recipient.belongsTo(Survey);

module.exports = {
    Recipient,
    Survey,
    User,
    db
};
