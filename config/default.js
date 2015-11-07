'use strict';

let nodemailer = require('nodemailer');

module.exports = {
	root: 'http://localhost:3002',
	iss: 'hallpass',
	athu: {
		url: 'http://localhost:3000/auth',
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
	// note: issuers must only have a-z, A-Z, 0-9, _, or -  characters, no whitespace
	issuers: {
		test: {  // looked up in JWT token as "iss"
			secret: process.env.ISSUER_TEST_SECRET,
			successRedirect: 'http://localhost:3002/invitation', // optionally can be passed within the JWT token as "successRedirect"
			errorRedirect: 'http://localhost:3002/invitation?error=true', // optional can be passed within the JTW token as "errorRedirect",
			email: {
				transport: 'gmail',
				template: './templates/test/email.htm',
				sendParameters: {
					from: 'test@test.com',
					subject: 'Invitation into Test App'
				}
			}
		}
	}
};
