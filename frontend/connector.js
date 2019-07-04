/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable new-cap */
const Express = require('express');
const app = new Express();
const bodyParser = require('body-parser');
const portAddress = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  res.send('asdfasdf');
});

app.listen(portAddress, () => {
  console.log('Start Server');
});
