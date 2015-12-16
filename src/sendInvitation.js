'use strict';

let jwt = require('jsonwebtoken');
let config = require('config');
let jwtUtils = require('./utils/jwt');
let _ = require('lodash');
let requiredData = ['payload.errorRedirect', 'payload.successRedirect'];

module.exports = function(req, res) {
	var token = _.get(req, 'body.jwt');
	if (!token) {
		res.status(400).json({ err: 'bad request' });
		return;
	}

	jwtUtils.verify({ token, requiredData })
	.then(function(data) {

		let issuerConfig = data.issuerConfig;
		let verifiedAndDecoded = data.verifiedAndDecoded;
		let issuerSecret = issuerConfig.secret;
		let iss = verifiedAndDecoded.iss;
		let errorRedirect = verifiedAndDecoded.errorRedirect;
		let successRedirect = verifiedAndDecoded.successRedirect;

		let invitationId = verifiedAndDecoded.invitationId;
		let signed = jwt.sign({ iss, invitationId, errorRedirect, successRedirect }, issuerSecret);

		if (issuerConfig.email) {
			let email = verifiedAndDecoded.email;
			if (!email) {
				res.status(400).json({ err: {
					name: 'MissingEmail',
					message: 'email address missing'
				}});
				return;
			}
			let transport = config.transports[issuerConfig.email.transport];
			let sendOptions = _.assign(issuerConfig.email.sendParameters, { to: email });
			let compiledTemplates = require('./compiledTemplates')[iss];
			sendOptions.html = compiledTemplates.email({
				href: config.root + '/invitation/accept?jwt=' + signed,
				title: config.
			});
			transport.sendMail(sendOptions);
		}

		res.status(200).json({ message: 'sent', invitation });
	})
	.catch(function(err) {
		console.error(err);
		res.status(400).json(err);
		return;
	});

};
