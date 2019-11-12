'using strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const { validateSingleIBAN } = require('./modules/ibanValidator');

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded( {extended: true}));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));