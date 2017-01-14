'use strict';

const express = require('express');
const morgan = require('morgan');
// this will load our .env file if we're
// running locally. On Gomix, .env files
// are automatically loaded.
require('dotenv').config();
const emailer = require("./emailer.js");

const {logger} = require('./utilities/logger');
// these are custom errors we've created
const {FooError, BarError, BizzError} = require('./errors');

const app = express();

// this route handler randomly throws one of `FooError`,
// `BarError`, or `BizzError`
const russianRoulette = (req, res) => {
  const errors = [FooError, BarError, BizzError];
  throw new errors[
    Math.floor(Math.random() * errors.length)]('It blew up!');
};

const alertMiddleware = (err, req, res, next) => {
  if (err.name==="FooError" || err.name==="BarError") {
    console.log("A FooError or BarError occurred. "+err);
    var emailData={
      from: process.env.ALERT_FROM_NAME+"<"+process.env.ALERT_FROM_EMAIL+">",
      to: process.env.ALERT_TO_EMAIL,
      subject: "ALERT: a "+err.name+" occurred.",
      text: "Error name: "+err.name+"\n\nError Stack: "+err.stack
    };
    emailer.sendEmail(emailData, process.env.SMPT_URL);
  }
  // `emailData` is an object that looks like this:
// {
//  from: "foo@bar.com",
//  to: "bizz@bang.com, marco@polo.com",
//  subject: "Hello world",
//  text: "Plain text content",
//  html: "<p>HTML version</p>"
// }
// const sendEmail = (emailData, smtpUrl=SMTP_URL)
  else if (err.name==="BizzError") {
    console.log("A BizzError occurred. " +err);
  }
  else {console.log("Another error occurred. "+err)}
};

app.use(morgan('common', {stream: logger.stream}));

// for any GET request, we'll run our `russianRoulette` function
app.get('*', russianRoulette);

// YOUR MIDDLEWARE FUNCTION should be activated here using
// `app.use()`. It needs to come BEFORE the `app.use` call
// below, which sends a 500 and error message to the client
app.use(alertMiddleware);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({error: 'Something went wrong'}).end();
});

const port = process.env.PORT || 8080;

const listener = app.listen(port, function () {
  logger.info(`Your app is listening on port ${port}`);
});
