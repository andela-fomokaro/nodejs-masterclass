/**
 * 
 * Helpers for various tasks
 */

 //Dependencies
 import crypto from 'crypto';
 import config from './config';

 // Containers for the helpers
 const helpers = {};


 // Create a SHA256 hash
 helpers.hash = (str) => {
   if (typeof(str) === 'string' && str.length > 0) {
     const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
     return hash;
   } else {
     return false;
   }
 };

 // Parse a JSON string to an object in all cases without throwing
 helpers.parseJsonToObject = (str) => {
   try {
     const obj = JSON.parse(str);
     return obj;
   } catch (e) {
     return {};
   }
 }

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = (strlength) => {
  strlength = typeof(strlength) == 'number' && strlength > 0 ? strlength : false;
  if (strlength) {
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz';

    // Start the final string
    let  str = '';
    for (let i = 1; i <= strlength; i++) {
      // Get a random character from the possibleCharacters string
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string

      str += randomCharacter;
    }

    // Return the final string
    return str;

  } else {
    return false;
  }
}


export default helpers;