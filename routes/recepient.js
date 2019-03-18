const { Recipient } = require("../models");
const requireCredits = require("../middleware/requireCredits");

module.exports = app => {
  app.get("/api/recipients", requireCredits, async (req, res) => {
    try {
      let recipients = await Recipient.findAll({ raw: true });
      res.json(recipients);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message
      });
    }
  });
};
