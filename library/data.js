/**
 * Library for storing and editing data
 * 
 */

// Dependencies
import fs from 'fs';
import helpers from './helpers';

// Container for the module (to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = './data/';

//Write data to a file
lib.create = (dir, file, data, callback) => {
  // Open the file for writing  
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'w', (err, fileDescriptor ) => {
    if(!err && fileDescriptor){
      // Convert data to string
      const stringData = JSON.stringify(data);
      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if(!err){
          fs.close(fileDescriptor, (err) => {
            if(!err) {
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
lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8', (err, data) => {
    if (!err && data) {
      const parsedData = helpers.parseJsonToObject(data);
      return callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update data from the file
lib.update = (dir, file, data, callback) => {
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+', (err, fileDescriptor) => {
    if(!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data);

      // Truncate the file
      fs.truncate(fileDescriptor, (err) => {
        if(!err) {
          // Write to file and close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if(!err) {
              fs.close(fileDescriptor, (err) => {
                if(!err) {
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
lib.delete = (dir, file, callback) => {
  // Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err) => {
    if(!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

export default lib;