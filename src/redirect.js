'use strict';

let jwt = require('jsonwebtoken');
let jwtUtils = require('./utils/jwt');
let config = require('config');
let url = require('url');

module.exports = function(req, res) {
	let returnToken = req.query.returnToken;
	let token = req.query.jwt;
	if (!token && !returnToken) {
		res.status(400).send('bad params');
		return;
	}
	jwtUtils.verify({
		token,
		issuerConfig: { secret: config.athu.secret },
		requiredData: ['payload.id', 'payload.provider']
	})
	.then(function(data) {
		return jwtUtils.verify({
			token: returnToken,
			requiredData: ['payload.invitation'],
			context: data.verifiedAndDecoded
		})
	})
	.then(function(data) {

		let issuerConfig = data.issuerConfig;

		let signed = jwt.sign({
			iss: config.iss,
			invitation: data.verifiedAndDecoded.invitation,
			profileId: data.context.id,
			provider: data.context.provider
		}, issuerConfig.secret);

		// account for querystring with url.parse
		let successRedirect = data.verifiedAndDecoded.successRedirect || issuerConfig.successRedirect;
		let parsedUrl = url.parse(successRedirect);

		// set querystring
		delete parsedUrl.search;
		parsedUrl.query = parsedUrl.query || {};
		parsedUrl.query.jwt = signed;

		console.log(url.format(parsedUrl));
		res.send('ok');
		//res.redirect(url.format(parsedUrl));
	})
	.catch(function(err) {
		console.log(err);
		res.status(400).json(err);
	});
};
