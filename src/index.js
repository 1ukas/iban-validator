'using strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const { validateSingleIBAN, validateMultipleIBAN } = require('./modules/ibanValidator');

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/validateSingle/', (req, res, next) => {
  // get the ibanCode parameter, uppercase it and trim it:
  const ibanCode = req.query.ibanCode.toUpperCase().trim();
  // try to validate it:
  validateSingleIBAN(ibanCode, (result) => {
    // prepare response data:
    const data = {
      iban: ibanCode, // iban string
      result: result // validation result boolean
    }
    // send response data and close request:
    return res.send(data);
  });
});

app.post('/api/validateFile/', (req, res, next) => {
  // try to validate the iban's in the file:
  validateMultipleIBAN(req.body.file, (result) => {
    // join the result array into a string with newline separators:
    const resultString = result.join('\n');
    // send response string and close request:
    return res.send(resultString);
  });
});

// handle root page:
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// handle 404:
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));