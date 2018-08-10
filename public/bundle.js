require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Create and export configuration variables
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'staging',
  'hashingSecret': 'thisIsASecret'

  // Production environment
};environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production',
  'hashingSecret': 'thisIsASecret'
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
var environmentToExport = _typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
exports.default = environmentToExport;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = __webpack_require__(10);

var _crypto2 = _interopRequireDefault(_crypto);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Containers for the helpers
/**
 * 
 * Helpers for various tasks
 */

//Dependencies
var helpers = {};

// Create a SHA256 hash
helpers.hash = function (str) {
  if (typeof str === 'string' && str.length > 0) {
    var hash = _crypto2.default.createHmac('sha256', _config2.default.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

exports.default = helpers;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                               * Primary file for the API
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                              */
// Dependencies


var _http = __webpack_require__(4);

var _http2 = _interopRequireDefault(_http);

var _https = __webpack_require__(5);

var _https2 = _interopRequireDefault(_https);

var _url = __webpack_require__(6);

var _url2 = _interopRequireDefault(_url);

var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _string_decoder = __webpack_require__(7);

var _string_decoder2 = _interopRequireDefault(_string_decoder);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _handlers = __webpack_require__(8);

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDecoder = _string_decoder2.default.StringDecoder;
var config = _config2.default;

// Instantiate the HTTP server
var httpServer = _http2.default.createServer(function (req, res) {
  unifiedServer(req, res);
});
// Start the HTTP server
httpServer.listen(config.httpPort, function () {
  console.log('The HTTP server is running on port ' + config.httpPort);
});

// Instantiate the HTTPS server
var httpsServerOptions = {
  'key': _fs2.default.readFileSync('./https/key.pem'),
  'cert': _fs2.default.readFileSync('./https/cert.pem')
};
var httpsServer = _https2.default.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});
// Start the HTTPS server
httpsServer.listen(config.httpsPort, function () {
  console.log('The HTTPS server is running on port ' + config.httpsPort);
});

// All the server logic for both the http and https server
var unifiedServer = function unifiedServer(req, res) {
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
    var chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : _handlers2.default.notFound;

    // Construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
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
};

// Define the request router
var router = {
  'ping': _handlers2.default.ping,
  'users': _handlers2.default.users
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data2 = __webpack_require__(9);

var _data3 = _interopRequireDefault(_data2);

var _helpers = __webpack_require__(2);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the handlers
/**
 * 
 * Request handlers
 */

// Dependencies
var handlers = {};

// Ping handler
handlers.ping = function (data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Users
handlers.users = function (data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
//Optional data: none
handlers._users.post = function (data, callback) {
  // Check that all required fields are field out
  var payload = JSON.parse(data.payload);
  var firstName = typeof payload.firstName == 'string' && payload.firstName.trim().length > 0 ? payload.firstName.trim() : false;
  var lastName = typeof payload.lastName === 'string' && payload.lastName.trim().length > 0 ? payload.lastName.trim() : false;
  var phoneNumber = typeof payload.phoneNumber === 'string' && payload.phoneNumber.trim().length === 10 ? payload.phoneNumber.trim() : false;
  var password = typeof payload.password === 'string' && payload.password.trim().length > 0 ? payload.password.trim() : false;
  var tosAgreement = typeof payload.tosAgreement === 'boolean' && payload.tosAgreement === true ? true : false;
  if (firstName && lastName && phoneNumber && password && tosAgreement, tosAgreement) {
    _data3.default.read('users', phoneNumber, function (err, data) {
      if (err) {
        // Hash the password
        var hashedPassword = _helpers2.default.hash(password);

        // Create the user object
        if (hashedPassword) {
          var userObject = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            hashedPassword: hashedPassword,
            'tosAgreement': true

            // Store the user
          };_data3.default.create('users', phoneNumber, userObject, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { 'Error': 'Could not create the new user' });
            }
          });
        } else {
          callback(500, { 'Error': 'Could not hash the user\'s password.' });
        }
      } else {
        // User already exists
        callback(400, { 'Error': 'A user with that phone number already exists' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required fields' });
  }
};

// Users - get
// Required data: phone
// Optional data: none
// Only let authenticated users access their object. Don't let them access anyonbe elses
handlers._users.get = function (data, callback) {
  // Check that the phone number is valid
  var phoneNumber = data.queryStringObject.phoneNumber.trim();
  phoneNumber = typeof data.queryStringObject.phoneNumber === 'string' && phoneNumber.length === 10 ? phoneNumber : false;

  if (phoneNumber) {
    //Lookup the user
    _data3.default.read('users', phoneNumber, function (err, data) {
      if (!err && data) {
        // Remove hashed password from the user before returing it to the requester
        delete data.hashedPassword;
        callback(200, data);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
};

// Users - put
// Required field : phoneNumber
// Optional data: firstName, lastName, password (at least one should be specified)
// Only let an authenticated user update their own object. Don't let them upate another users data
handlers._users.put = function (data, callback) {
  // check for the required field
  var payload = JSON.parse(data.payload);

  var phoneNumber = payload.phoneNumber.trim();
  phoneNumber = typeof payload.phoneNumber === 'string' && phoneNumber.length === 10 ? phoneNumber : false;

  // Check for the optional fields
  var firstName = typeof payload.firstName == 'string' && payload.firstName.trim().length > 0 ? payload.firstName.trim() : false;
  var lastName = typeof payload.lastName === 'string' && payload.lastName.trim().length > 0 ? payload.lastName.trim() : false;
  var password = typeof payload.password === 'string' && payload.password.trim().length > 0 ? payload.password.trim() : false;

  // Error if the phonenNumber is invalid
  if (phoneNumber) {
    // Error is nothing is sent to update
    if (firstName || lastName || password) {
      // Lookup the user
      _data3.default.read('users', phoneNumber, function (err, userData) {
        if (!err && userData) {
          // update the fields necessary
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = _helpers2.default.hash(password);
          }
          // Store the new updates
          _data3.default.update('users', phoneNumber, userData, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { 'Error': 'Could not update the user' });
            }
          });
        } else {
          callback(400, { 'Error': 'The specified user does not exist' });
        }
      });
    } else {
      callback(400, { 'Error': 'Missing fields to update' });
    }
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
};

// Users - delete
// Required field: phoneNumber
// Only let authenticated user delete their object.
// Cleanup (data) any other data files associated with this user
handlers._users.delete = function (data, callback) {
  // Check that the phone number is valid
  var phoneNumber = data.queryStringObject.phoneNumber.trim();
  phoneNumber = typeof data.queryStringObject.phoneNumber === 'string' && phoneNumber.length === 10 ? phoneNumber : false;

  if (phoneNumber) {
    //Lookup the user
    _data3.default.read('users', phoneNumber, function (err, data) {
      if (!err && data) {
        _data3.default.delete('users', phoneNumber, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { 'Error': 'Could not delete the specified user' });
          }
        });
      } else {
        callback(400, { 'Error': 'Could not find the specified user' });
      }
    });
  } else {
    callback(400, { 'Error': 'Missing required field' });
  }
};

exports.default = handlers;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _helpers = __webpack_require__(2);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Container for the module (to be exported)
/**
 * Library for storing and editing data
 * 
 */

// Dependencies
var lib = {};

// Base directory of the data folder
lib.baseDir = './data/';

//Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing  
  _fs2.default.open(lib.baseDir + dir + '/' + file + '.json', 'w', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      var stringData = JSON.stringify(data);
      // Write to file and close it
      _fs2.default.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          _fs2.default.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback(err.message, 'Could not create new file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = function (dir, file, callback) {
  _fs2.default.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
    if (!err && data) {
      var parsedData = _helpers2.default.parseJsonToObject(data);
      return callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update data from the file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  _fs2.default.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Truncate the file
      _fs2.default.truncate(fileDescriptor, function (err) {
        if (!err) {
          // Write to file and close it
          _fs2.default.writeFile(fileDescriptor, stringData, function (err) {
            if (!err) {
              _fs2.default.close(fileDescriptor, function (err) {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error writing to existing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  });
};

// Delete a file
lib.delete = function (dir, file, callback) {
  // Unlink the file
  _fs2.default.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

exports.default = lib;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map