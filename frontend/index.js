/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const Express = require('express');
const Web3 = require('web3');
const app = new Express();
const web3 = new Web3();
const bodyParser = require('body-parser');
const portAddress = 3000;
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));

// eslint-disable-next-line no-tabs
const aaaContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiv",
				"type": "address"
			},
			{
				"name": "deliver_",
				"type": "address"
			},
			{
				"name": "parcel_",
				"type": "string"
			}
		],
		"name": "A_TO_D",
		"outputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "deliverer",
				"type": "address"
			},
			{
				"name": "coin",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "parcel_",
				"type": "string"
			}
		],
		"name": "show_box",
		"outputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "deliverer",
				"type": "address"
			},
			{
				"name": "coin",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "deliver_",
				"type": "address"
			},
			{
				"name": "parcel_",
				"type": "string"
			}
		],
		"name": "D_TO_R",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
])


const couce = aaaContract.at('0xfe429fdaFAa30f8ecbF1db732D8ee2b664FB79c4');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('asdfasdf');
});

// TODO:get account balance
// 용법 : ~~~/name/address -> address의 잔액을 전송한다.
app.get('/name/:name', (req, res) => {
  res.json({name: req.params.name, pay: web3.fromWei(web3.eth.getBalance(req.params.name))});
});

// Sender to Deliverer
app.post('/STD/', (req, res) => {
  console.log(req.body);
  if (web3.personal.unlockAccount(req.body.from, req.body.pass)) {
    couce.S_TO_D(req.body.receiv, req.body.deliver_, req.body.parcel_, {from: req.body.from, value: req.body.amount, gas: 2000000}, (err, result) => {
      if (!err) {
        res.json({message: 'Transaction is sent Successful!(' + result + ')'});
      } else {
        res.json({message: err});
      }
    });
  }
});

app.get('/get/:data', (req, res) => {
  const parcel_data = couce.show_box(req.params.data);
  console.log(parcel_data);
  res.json({sender: parcel_data[0], receiver: parcel_data[1], deliverer: parcel_data[2]});
});

// Deliverer to receiver
app.post('/DTR/', (req, res) => {
  if (web3.personal.unlockAccount(req.body.from, req.body.pass)) {
    couce.D_TO_R(req.body.deliver_, req.body.parcel_, {from: req.body.from, gas: 2000000}, (err, result) => {
      if (!err) {
        console.log(result);
        res.json({message: 'Transaction is sent Successful!(' + result + ')'});
      } else {
        console.log(err);
        res.json({message: err});
      }
    });
  }
});


app.get('/newAccount/:pass', (req, res) => {
  const newId = web3.personal.newAccount(req.params.pass);
  web3.personal.unlockAccount(web3.eth.coinbase, '1234');
  web3.eth.sendTransaction({to: newId, from: web3.eth.coinbase, value: web3.toWei('100', 'ether')}); // 최초 코인 할당.
  console.log(newId);
  res.json({name: newId});
});

// 로그 출력


app.listen(portAddress, () => {
  console.log('Start Server');
});
