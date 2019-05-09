
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const Express = require('express');
const Web3 = require('web3');
const app = new Express();
const web3 = new Web3();
const bodyParser = require('body-parser');
const portAddress = 3000;
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// TODO:get account balance
app.get('/', (req, res) => {
  res.json({message: web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]))});
});


app.put('/', (req, res) => {
  res.json({message: 'put'});
});

// TODO:send transaction
app.post('/', (req, res) => {
  if (web3.personal.unlockAccount(req.body.from, req.body.pass)) {
    web3.eth.sendTransaction({from: req.body.from, to: req.body.to, value: req.body.amount}, (err, result)=>{
      if (!err) {
        console.log('Transaction is sent Successful!('+result+')');
      } else {
        console.log(err);
      }
    });
  }
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
