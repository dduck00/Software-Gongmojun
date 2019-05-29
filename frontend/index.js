/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable new-cap */
const Express = require('express');
const Web3 = require('web3');
const app = new Express();
const web3 = new Web3();
const bodyParser = require('body-parser');
const portAddress = 3000;
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));

// eslint-disable-next-line no-tabs

const aaaContract = web3.eth.contract(
    [
      {
        'constant': false,
        'inputs': [
          {
            'name': 'receiv',
            'type': 'address',
          },
          {
            'name': 'deliver_',
            'type': 'address',
          },
          {
            'name': 'parcel_',
            'type': 'string',
          },
        ],
        'name': 'A_TO_D',
        'outputs': [
          {
            'name': 'sender',
            'type': 'address',
          },
          {
            'name': 'receiver',
            'type': 'address',
          },
          {
            'name': 'deliverer',
            'type': 'address',
          },
          {
            'name': 'coin',
            'type': 'uint256',
          },
        ],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function',
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'deliver_',
            'type': 'address',
          },
          {
            'name': 'parcel_',
            'type': 'string',
          },
        ],
        'name': 'D_TO_R',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function',
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': 'parcel_',
            'type': 'string',
          },
        ],
        'name': 'show_box',
        'outputs': [
          {
            'name': 'sender',
            'type': 'address',
          },
          {
            'name': 'receiver',
            'type': 'address',
          },
          {
            'name': 'deliverer',
            'type': 'address',
          },
          {
            'name': 'coin',
            'type': 'uint256',
          },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
      },
    ]
);

const couce = aaaContract.at('0x414968bfd73dbe53eb8388c5bd44c4f30daf3304');


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
    couce.A_TO_D(req.body.receiv, req.body.deliver_, req.body.parcel_, {from: req.body.from, value: req.body.amount, gas: 2000000}, (err, result)=>{
      if (!err) {
        res.json({message: 'Transaction is sent Successful!('+result+')'});
      } else {
        res.json({message: err});
      }
    });
  }
});
 
app.get('/get/:data', (req, res)=>{
  res.json(couce.show_box(req.params.data));
});

// Deliverer to receiver
app.post('/DTR/', (req, res) => {
  if (web3.personal.unlockAccount(req.body.from, req.body.pass)) {
    couce.D_TO_R.sendTransaction(req.body.deliver_, req.body.parcel_, {from: req.body.from, gas: 2000000}, (err, result)=>{
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
