'use strict';

let nodemailer = require('nodemailer');

/*
	View the EXAMPLE_ENV to see how to format your environment variables.
*/

let defaultTransport = 'gmail';
let issuerNames = process.env.ISSUER_NAMES.split(',');
let issuers = {};

for(let issuer of issuerNames) {
	let key = issuer.trim();
	issuers[key].secret = process.env['ISSUER_' + key + '_SECRET'];
	issuers[key].successRedirect = process.env['ISSUER_' + key + '_SUCCESS_REDIRECT'];
	issuers[key].errorRedirect = process.env['ISSUER_' + key + '_ERROR_REDIRECT'];
	issuers[key].email {
		transport: process.env['ISSUER_' + key + '_EMAIL_TRANSPORT'] || defaultTransport,
		template: process.env['ISSUER_' + key + '_EMAIL_TEMPLATE'],
		sendParameters: {
			from: process.env['ISSUER_' + key + '_EMAIL_FROM'],
			subject: process.env['ISSUER_' + key + '_EMAIL_SUBJECT']
		}
	}
}

module.exports = {
	port: process.env.PORT,
	sslPort: process.env.SSL_PORT,
	root: process.env.ROOT_URL,
	iss: 'hallpass',
	athu: {
		url: process.env.ATHU_URL,
		secret: process.env.ATHU_SECRET,
		providers: ['google']
	},
	athuSecret: process.env.SECRET,
	jwtSupportedAlgorithms: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'],
	// assumes nodemailer compatible modules installed here
	transports: {
		gmail: nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS
			}
		})
	},
	issuers: issuers
};
