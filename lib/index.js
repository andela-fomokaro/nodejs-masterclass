'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _string_decoder = require('string_decoder');

var _string_decoder2 = _interopRequireDefault(_string_decoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDecoder = _string_decoder2.default.StringDecoder;

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

  // Get the HTTP Method
  var method = req.method.toLowerCase();

  //Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the headers as an object
  var headers = req.headers;

  //Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function () {
    buffer += decoder.end();

    // Send the response
    res.end('Hello World\n');
    // Log the request path
    console.log('Request received with this payloads: ', buffer);
  });
});

//Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log('The server is listening on port 3000 now');
});