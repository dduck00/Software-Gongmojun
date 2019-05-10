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
// 용법 : ~~~/name/address -> address의 잔액을 전송한다.
app.get('/name/:name', (req, res) => {
  res.json({name: req.params.name, pay: web3.fromWei(web3.eth.getBalance(req.params.name))});
});

// Sender to Deliverer
app.post('/STD/', (req, res) => {
  if (web3.personal.unlockAccount(req.body.from, req.body.pass)) {
    web3.eth.sendTransaction({from: req.body.from, to: req.body.to, value: req.body.amount}, (err, result)=>{
      if (!err) {
        res.json({message: 'Transaction is sent Successful!('+result+')'});
      } else {
        res.json({message: err});
      }
    });
  }
});

// Deliverer to receiver
app.post('/DTR/', (req, res) => {
  if (web3.personal.unlockAccount(req.body.from, req.body.pass)) {
    web3.eth.sendTransaction({from: req.body.from, to: req.body.to, value: req.body.amount}, (err, result)=>{
      if (!err) {
        res.json({message: 'Transaction is sent Successful!('+result+')'});
      } else {
        res.json({message: err});
      }
    });
  }
});


app.post('/newAccount', (req, res)=>{
  const newId = web3.personal.newAccount('1234');
  res.json({name: newId});
});

app.listen(portAddress, () => {
  console.log('Start Server');
});
