'use strict';

let config = require('config');
let express = require('express');
let favicon = require('serve-favicon');
let app = express();
let port = process.env.PORT || config.port || 3002;
let session = require('express-session');

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

app.post('/invitation/send', require('./invitationRequest'));
app.get('/invitation/accept', require('./acceptInvitation'));

let server = app.listen(port, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('hallpass listening at http(s)://%s:%s', host, port);
});
