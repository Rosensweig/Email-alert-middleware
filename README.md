Starter files for emaill alert middleware challenge
===================================================

https://github.com/Thinkful-Ed/node-email-alert-middleware-challenge-starter

For the email sending feature to work, you need to set four configuration variables inside a `.env` file:

```
ALERT_FROM_EMAIL='account-name@gmail.com'
ALERT_FROM_NAME='SERVICE ALERTS'
ALERT_TO_EMAIL='service-alert-recipient@gmail.com'
SMTP_URL='smtps://account-name@gmail.com:password@smtp.gmail.com'
```

DO NOT hard code these into your source code. They should be set as environment
variables on your server, and your application code should access them via
`process.env.myVar`.