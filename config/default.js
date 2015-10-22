'use strict';

module.exports = {
	sessionSecret: process.env.SESSION_SECRET,
	jwtSupportedAlgorithms: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'],
	// assumes nodemailer modules installed here
	nodemailer: {
		'nodemailer-smtp-transport': {
			port: 456,
			host: 'smtp.google.com',
			ssl: true
		}
	},
	// note: issuers must only have a-z, A-Z, 0-9, _, or -  characters, no whitespace
	issuers: {
		test: {
			secret: process.env.ISSUER_TEST_SECRET, // "iss" within the JWT token
			successRedirect: '', // optionally can be passed within the JWT token as "successRedirect"
			errorRedirect: '', // optional can be passed within the JTW token as "errorRedirect",
			transports: ['nodemailer-smtp-transport']
		}
	}
};
