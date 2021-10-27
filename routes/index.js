var express = require('express');
var router = express.Router();
var familycoinClient = require('bitcoin-core');

const wallet = new familycoinClient({
  host: process.env.FAMILYCOIN_HOST,
  port: process.env.FAMILYCOIN_PORT,
  username: process.env.FAMILYCOIN_USERNAME,
  password: process.env.FAMILYCOIN_PASSWORD
})

/* GET home page. */
router.get('/', function(req, res, next) {
  wallet.command('getbalance').then( (response)=>{
    res.send(response);
  })
  
});

module.exports = router;
