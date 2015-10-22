let jwt = require('jsonwebtoken');
let config = require('config');
let sa = config.jwtSupportedAlgorithms;
let saRegEx = new RegExp('^(' + sa.join('|') + ')$', 'i');
let issuerRegEx = /^[a-z\-_0-9]+$/i;
let _ = require('lodash');

module.exports = function(req, res) {
	var token = _.get(req, 'body.jwt');
	if (!token) {
		res.status(400).send('bad request');
		return;
	}

	let decoded = jwt.decode(token, { complete: true });
	let alg = _.get(decoded, 'header.alg');
	let issuer = _.get(decoded, 'payload.iss');
	let issuerConfig = config.issuers[issuer];

	if (!alg || !saRegEx.test(alg) || !issuer || !issuerRegEx.test(issuer) || !issuerConfig) {
		res.status(400).send('bad request');
		return;
	}
	let issuerSecret = issuerConfig.secret;
	jwt.verify(token, issuerSecret, function(err, verifiedAndDecoded) {
		if (err) {
			res.status(403).json(err);
			return;
		}
		let errorRedirect = _.get(verifiedAndDecoded, 'payload.errorRedirect') || issuerConfig.errorRedirect;
		let successRedirect = _.get(verifiedAndDecoded, 'payload.successRedirect') || issuerConfig.successRedirect;
		if (!errorRedirect || !successRedirect) {
			res.status(400).json({ err: {
				name: 'MissingRedirects',
				message: 'errorRedirect and successRedirect must be in request or configured on the server'
			}});
			return;
		}
		let signed = jwt.sign({ iss, invitationId: req.params.id, errorRedirect, successRedirect }, issuerSecret);
		// todo: transports
		res.status(200).json({ message: 'invitation sent' });
	});
)
};
