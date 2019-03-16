const express = require("express");
const Router = express.Router();
const keys = require("../config/keys");
const { Survey } = require("../models/index");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates");
const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
Router.get("/current_user", (req, res) => {
  res.json(req.user);
});

Router.post("/surveys/webhooks", (req, res) => {
  const events = _.map(req.body, event => {
    const pathname = new URL(event.url).pathname;
    const p = new Path("/api/surveys/:surveyId/:choice");
    console.log(p.test(pathname));
    res.json(p);
  });
});

Router.get("/survey/thanks", (req, res) => {
  res.json("thanks for voting!");
});

Router.post("/surveys", requireLogin, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  console.log(req.body);

  const survey = await Survey.create({
    title,
    subject,
    body,
    recipients,
    _user: req.user.id,
    dateSent: Date.now()
  });
  survey.recipients = recipients.split(",").map(email => ({
    email: email.trim()
  }));
  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    await mailer.send();
    await survey.save();
    res.json(req.user);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = Router;
