const express = require("express");
const Router = express.Router();
const keys = require("../config/keys");
const { Survey, Recipient } = require("../models/index");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const nameHashMap = require("../util/nameHashMap");

Router.get("/current_user", (req, res) => {
  res.json(req.user);
});

Router.post("/surveys/webhooks", (req, res) => {
  const events = _.map(req.body, async event => {
    try {
      if (event.email) {
        const pathname = new URL(event.url).pathname;
        const p = new Path("/api/surveys/:surveyId/:choice");
        console.log("REQ BODY");
        console.log(req.body);
        console.log("EVENT");
        console.log(event);
        console.log(p.test(pathname));
        const responded = p.test(pathname);
        let existingUser = await Recipient.findOne({
          where: {
            email: event.email
          }
        });
        console.log("existing user");
        console.log(existingUser);
        if (existingUser) {
          let recipient = await Recipient.update(
            { responded: responded.choice },
            {
              where: {
                email: event.email
              }
            }
          );
          console.log(recipient);
        } else {
          let recipient = await Recipient.create({
            email: event.email,
            name: nameHashMap(event.email),
            responded: responded.choice,
            people: 1,
            surveySchemaId: responded.surveyId
          });

          console.log(recipient);
        }
        return res.json(p);
      } else {
        res.json("nothing found");
      }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
});

Router.get("/survey/thanks", requireCredits, (req, res) => {
  res.json("thanks for voting!");
});

Router.post("/surveys", requireLogin, requireCredits, async (req, res) => {
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
