/*
 * Primary file for the API
 * 
 * 
*/
// Dependencies
import http from 'http';
import url from 'url';
import string_decoder from 'string_decoder';

const StringDecoder = string_decoder.StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer( (req, res) => {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  //Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the headers as an object
  const headers = req.headers;

  //Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };
    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode,payload) => {
      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof(payload) === 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response: ",statusCode,payloadString);
    });
  });
});

//Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log('The server is listening on port 3000 now');
});

// Define all the handlers
const handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  callback(200,{'name':'sample handler'});
};

// Not found handler
handlers.notFound = (data,callback) => {
callback(404);
};

// Define the request router
const router = {
'sample' : handlers.sample
};