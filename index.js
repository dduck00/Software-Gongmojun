/* eslint-disable linebreak-style */
const Express = require('express');
const app = new Express();
const portAddress = 3000;


app.get('/', (req, res) => {
  res.json({message: 'get'});
});

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
