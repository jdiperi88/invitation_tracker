const { Recipient } = require("../models/Recipient");
// const ensureAuthenticated = require("../middleware/ensureAuthenticated");

module.exports = app => {
    app.get("/api/recipients", async (req, res) => {
        try {
            let recipients = await Recipient.findAll({
                raw: true
            });
            console.log(recipients);
            res.json(recipients);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    });
};
