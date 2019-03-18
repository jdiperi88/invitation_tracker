// const recipientSchema = new Schema({
// 	email: String,
// 	responded: { type: Boolean, deafult: false }
// });
module.exports = (db, Sequelize) =>
  db.define("recipientSchema", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    responded: Sequelize.STRING,
    people: Sequelize.INTEGER
  });
