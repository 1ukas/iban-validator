'using strict'
const express = require('express');
const cors = require('cors');

const app = express();

const ibanValidator = require('./modules/ibanValidator');

app.use(cors());

app.get('/:inputCode', (req, res, next) => {
  ibanValidator.validateSingleIBAN(req.params.inputCode.toUpperCase(), (result) => {
    return res.send(`${result}`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));