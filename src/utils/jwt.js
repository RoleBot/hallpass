'use strict';

let jwt = require('jsonwebtoken');
let config = require('config');
let sa = config.jwtSupportedAlgorithms;
let saRegEx = new RegExp('^(' + sa.join('|') + ')$', 'i');
let issuerRegEx = /^[a-z\-_0-9]+$/i;
let _ = require('lodash');

function verifyToken(options) {
	var promise = new Promise(function(resolve, reject) {

		let token = options.token;
		let decoded = jwt.decode(token, { complete: true });
		let alg = _.get(decoded, 'header.alg');
		let iss = _.get(decoded, 'payload.iss');
		let issuerConfig = config.issuers[iss];
		let issuerSecret = issuerConfig.secret;

		if (!alg || !saRegEx.test(alg) || !iss || !issuerRegEx.test(iss) || !issuerConfig) {
			reject({ err: 'jwt incomplete' });
			return;
		}

		let errorRedirect = _.get(decoded, 'payload.errorRedirect') || issuerConfig.errorRedirect;
		let successRedirect = _.get(decoded, 'payload.successRedirect') || issuerConfig.successRedirect;

		if (!errorRedirect || !successRedirect) {
			reject({ err: {
				name: 'MissingRedirects',
				message: 'errorRedirect and successRedirect must be in request or configured on the server'
			}});
			return;
		}

		jwt.verify(token, issuerSecret, function(err, verifiedAndDecoded) {
			if (err) {
				reject({ err });
				return;
			}
			resolve({ verifiedAndDecoded, issuerConfig });
		});

	});
	return promise;
}

module.exports = { verify: verifyToken };
