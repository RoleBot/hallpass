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
		let issuerConfig = options.issuerConfig || config.issuers[iss];
		let issuerSecret = issuerConfig.secret;

		if (!alg || !saRegEx.test(alg) || !iss || !issuerRegEx.test(iss) || !issuerConfig) {
			reject({ err: 'jwt incomplete' });
			return;
		}

		if (options.requiredData) {
			for (let required of options.requiredData) {
				if (!_.has(decoded, required)) {
					reject({ err: {
						name: 'missing required param',
						message: required + ' missing in jwt'
					}});
					return;
				}
			}
		}

		jwt.verify(token, issuerSecret, function(err, verifiedAndDecoded) {
			if (err) {
				reject({ err });
				return;
			}
			resolve({ verifiedAndDecoded, issuerConfig, context: options.context });
		});

	});
	return promise;
}

module.exports = { verify: verifyToken };
