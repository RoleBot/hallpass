'use strict';

let jwt = require('jsonwebtoken');
let jwtUtils = require('./utils/jwt');
let config = require('config');
let querystring = require('querystring');
let requiredData = ['payload.errorRedirect', 'payload.successRedirect'];

module.exports = function(req, res) {
	if (!req.query.jwt) {
		res.status(400).send('bad request');
		return;
	}
	jwtUtils.verify({ token: req.query.jwt, requiredData })
	.then(function(data) {
		// make athu request
		if (config.athu.providers.indexOf(req.query.provider) === -1) {
			res.status(400).send('provider ' + req.query.provider + ' not supported');
			return;
		}
		let qs = querystring.stringify({ returnToken: req.query.jwt, referrer: config.root + '/' });
		res.redirect(config.athu.url + '/' + req.query.provider + '?' + qs);
	})
	.catch(function(err) {
		res.status(400).send(err);
	});
};
