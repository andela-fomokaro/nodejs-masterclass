'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The server should respond to all requests with a string
/*
 * Primary file for the API
 * 
 * 
*/

// Dependencies
var server = _http2.default.createServer(function (req, res) {
  // Get the URL and parse it
  var parsedUrl = _url2.default.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Send the response
  res.end('Hello World\n');

  // Log the request path
  console.log('Request received on path: ' + trimmedPath);
});

//Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log('The server is listening on port 3000 now');
});