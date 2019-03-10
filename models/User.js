//describes all the properties that the schema might have
// const userSchema = new Schema({
// 	googleID: String,
// 	credits: {
// 		type: Number,
// 		default: 0
// 	}
// });
module.exports = (db, Sequelize) =>
  db.define("userSchema", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    googleId: Sequelize.STRING,
    email: Sequelize.STRING,
    responded: Sequelize.BOOLEAN
  });
