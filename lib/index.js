'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                               * Primary file for the API
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                              */
// Dependencies


var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _string_decoder = require('string_decoder');

var _string_decoder2 = _interopRequireDefault(_string_decoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDecoder = _string_decoder2.default.StringDecoder;

// The server should respond to all requests with a string
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

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    var chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };
    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof statusCode === 'number' ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = (typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object' ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
});

//Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log('The server is listening on port 3000 now');
});

// Define all the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
  callback(200, { 'name': 'sample handler' });
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Define the request router
var router = {
  'sample': handlers.sample
};