// const surveySchema = new Schema({
//   title: String,
//   body: String,
//   subject: String,
//   recipients: [RecipientSchema],
//   yes: { type: Number, default: 0 },
//   no: { type: Number, default: 0 },
//   _user: { type: Schema.Types.ObjectId, ref: "User" },
//   dateSent: Date,
//   lastResponded: Date
// });
module.exports = (db, Sequelize) =>
    db.define("surveySchema", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        body: Sequelize.STRING,
        subject: Sequelize.STRING,
        recipients: Sequelize.STRING,
        responded: Sequelize.BOOLEAN,
        dateSent: Sequelize.DATE,
        lastResponded: Sequelize.DATE
    });
