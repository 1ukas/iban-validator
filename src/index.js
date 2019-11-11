'using strict'
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
  return res.send('received get request');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));