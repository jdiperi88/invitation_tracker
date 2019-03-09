const express = require("express");
const Router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates");
const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
Router.get("/current_user", (req, res) => {
	res.send(req.user);
});

Router.post("/surveys/webhooks", (req, res) => {
	const events = _.map(req.body, event => {
		const pathname = new URL(event.url).pathname;
		const p = new Path("/api/surveys/:surveyId/:choice");
		console.log(p.test(pathname));
	});
});

Router.post("/stripe", requireLogin, async (req, res) => {
	const charge = await stripe.charges.create({
		amount: 500,
		currency: "usd",
		description: "$5 for 5 credits",
		source: req.body.id
	});
	req.user.credits += 5;
	const user = await req.user.save();
	res.send(user);
});

Router.get("/survey/thanks", (req, res) => {
	res.send("thanks for voting!");
});

Router.post("/surveys", requireLogin, requireCredits, async (req, res) => {
	const { title, subject, body, recipients } = req.body;
	console.log(req.body);

	const survey = new Survey({
		title,
		subject,
		body,
		recipients: recipients.split(",").map(email => ({
			email: email.trim()
		})),
		_user: req.user.id,
		dateSent: Date.now()
	});
	const mailer = new Mailer(survey, surveyTemplate(survey));
	try {
		await mailer.send();
		await survey.save();
		req.user.credits -= 1;
		const user = await req.user.save();
		res.send(user);
	} catch (err) {
		res.status(422).send(err);
	}
});

module.exports = Router;
