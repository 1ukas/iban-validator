'use strict'

// IBAN country code list with their expected IBAN string length:
const COUNTRY_CODES = require('../country-codes.json');

module.exports.getCountryCode = (inputCode, resultCallback) => {
  // if the country code doesn't exist return false to the callback:
  if (!COUNTRY_CODES[inputCode]) {
    return resultCallback(false);
  }
  else {
    // else if country code is found return the expected IBAN length:
    return resultCallback(COUNTRY_CODES[inputCode].length);
  }
}