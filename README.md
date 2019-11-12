# IBAN Validation API

API - [`https://stormy-woodland-24325.herokuapp.com/`](https://stormy-woodland-24325.herokuapp.com/)

## Paths
  [`/api/validateSingle/`](https://stormy-woodland-24325.herokuapp.com/api/validateSingle/) </br>
  Validates a single IBAN. </br>
  Takes `ibanCode` as a parameter. </br>
  
  [`/api/validateFile/`](https://stormy-woodland-24325.herokuapp.com/api/validateFile/) </br>
  Validates a file of IBANs. </br>
  Takes a base64 blob as a request body file `(req.body.file)`. </br>

## Installation
Requires [`Node.js`](https://nodejs.org/en/download/current/) and `npm`. </br>
Open terminal in the project directory. </br>
Run `npm install` to install necessary libraries. </br>
Run `npm start` to start the server on `localhost:3000`. </br>
