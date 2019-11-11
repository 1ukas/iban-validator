'use strict'

const getCountryCode = require('./getCountryCode');

const LETTERS = {
  A: 10, B: 11, C: 12, D: 13, E:14, 
  F: 15, G: 16, H: 17, I: 18, J: 19, 
  K: 20, L: 21, M: 22, N: 23, O: 24, 
  P: 25, Q: 26, R: 27, S: 28, T: 29, 
  U: 30, V: 31, W: 32, X: 33, Y: 34, 
  Z: 35
}

const calculateMod = (inputString, resultCallback) => {
  // parse the input substring as int:
  const n = parseInt(inputString, 10);
  console.log(n);
  // calculate mod 97 on it and return it:
  return resultCallback(n % 97);
}

module.exports.validateSingleIBAN = (ibanString, resultCallback) => {
  try {
    // if received data is empty throw an error:
    if (ibanString.length === 0) throw new Error('received data is empty');
    console.log(ibanString);
    
    // 
    getCountryCode.getCountryCode(ibanString.substring(0,2), (result) => {
      if (!result || ibanString.length !== result) return resultCallback(false);

      const rearrangedIBAN = ibanString.substring(4, ibanString.length) + ibanString.substring(0, 4);
      console.log(rearrangedIBAN);

      // convert each character in the iban string to decimal:
      const toIntIBAN = rearrangedIBAN.replace(/\D/g, (char) => {
        if (LETTERS[char]) return LETTERS[char];
      });
      console.log(toIntIBAN);

      // check digit test:
      let ibanCopy = toIntIBAN;
      let previousMod = "";
      while (ibanCopy.length > 0) {
        let substring;
        if (previousMod === "") {
          substring = previousMod + ibanCopy.substring(0, 9);
          ibanCopy = ibanCopy.substring(9);
        }
        else {
          substring = previousMod + ibanCopy.substring(0, 7);
          ibanCopy = ibanCopy.substring(7);
        }

        previousMod = calculateMod(substring, (result) => {
          return result.toString();
        });
      }

      if (previousMod === "1") return resultCallback(true);
      else return resultCallback(false);
    });
  }
  catch (error) {
    // catch any errors and log them:
    console.error(error);
    // return false in the callback as the function didn't complete successfully:
    resultCallback(false);
  }
}