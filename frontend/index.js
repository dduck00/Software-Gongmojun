/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
const Express = require('express');
const Web3 = require('web3');
const app = new Express();
const web3 = new Web3();
const portAddress = 3000;


// TODO:get account balance
app.get('/', (req, res) => {
  res.json({message: 'get'});
});

// TODO:send transaction
app.put('/', (req, res) => {
  res.json({message: 'put'});
});

app.post('/', (req, res) => {
  res.json({message: 'post'});
});

app.delete('/', (req, res) => {
  res.json({message: 'delete'});
});

app.patch('/', (req, res) => {
  res.json({message: 'patch'});
});

app.copy('/', (req, res) => {
  res.json({message: 'copy'});
});

app.listen(portAddress, () => {
  console.log('example');
});
