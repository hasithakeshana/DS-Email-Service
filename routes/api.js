const express = require("express");

const router = express.Router();

const nodemailer = require("nodemailer"); // import nodemailer module for send  emails

// create the endpoint(URL) for send emails for send alert messages when sensor levels up

router.post("/sendEmail", async (req, res, next) => {
	const receiverEmail = req.body.receiverEmail; // get the reciver email address from body of the  request
	const senderMail = ""; // set emailmaddress of sender
	const password = ""; // set password of sender

	/*
    before send emails using node/express app need to allow low security features in google account
    allow less secure feature on in google
    link - https://myaccount.google.com/lesssecureapps
*/

	try {
		/*
       create reusable transporter object using the default SMTP transport
      */
		let transporter = nodemailer.createTransport({
			service: "gmail", // use gmail as the email service
			port: 25, // port number
			secure: false, // true for 465, false for other ports
			auth: {
				// autnetication details
				user: senderMail,
				pass: password,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		let HelperOptions = {
			from: senderMail, // sender address
			to: receiverEmail, // list of receivers
			subject: "Warning Message", // Subject line
			text: "", // plain text body
			html: ` 
                  <h3>Sensor Details</h3>
                  <li>location: ${req.body.location}</li>
                  <li>CO2 level: ${req.body.co2Level}</li>
                  <li>H20 level: ${req.body.h2oLevel}</li>
                  <h3>Message</h3>
                  <p>${req.body.message}</p>`,
		};

		// HTML version of the message

		transporter.sendMail(HelperOptions, (error, info) => {
			// send mail with defined transport object
			if (error) {
				return console.log(error);
			}

			console.log("The message was sent!");

			console.log(info);

			res.json(info); // send the json response
		});
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
