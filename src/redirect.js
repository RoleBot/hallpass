'use strict';

module.exports = function(req, res) {
	res.send('ok');
	return;
	let token = req.query.token;
	delete req.query.token;
	if (!token) {
		// todo: error
		return;
	}
};
