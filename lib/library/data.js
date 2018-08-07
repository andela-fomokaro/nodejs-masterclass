'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Container for the module (to be exported)
/**
 * Library for storing and editing data
 * 
 */

// Dependencies
var lib = {};

// Base directory of the data folder
lib.baseDir = _path2.default.join(__dirname, './../data/');

//Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing
  _fs2.default.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file amd close it
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
      callback('Could not create new file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = function (dir, file, callback) {
  _fs2.default.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
    callback(err, data);
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