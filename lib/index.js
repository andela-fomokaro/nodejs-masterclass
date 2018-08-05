'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The server should respond to all requests with a string
var server = _http2.default.createServer(function (req, res) {
  res.end('Hello World\n');
});

//Start the server, and have it listen on port 3000
/*
 * Primary file for the API
 * 
 * 
*/

// Dependencies
server.listen(3000, function () {
  console.log('The server is listening on port 3000 now');
});