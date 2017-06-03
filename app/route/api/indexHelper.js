var express = require('express');

module.exports = {
	sendMail: function (receiver, message) {
		const nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		var transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'gothdnnk@gmail.com',
		        pass: 'Gothdn181986'
		    }
		});

		// setup email data with unicode symbols
		var mailOptions = {
		    from: '"Test" <gothdnnk@gmail.com>', // sender address
		    to: receiver, // list of receivers
		    subject: 'Activate your account', // Subject line
		    text: message // plain text body
		//    html: '<b>{{message}}</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function (error, info) {
		    if (error) {
		        console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});
	}
}