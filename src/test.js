
let publicKey = 'GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW'

secretKey = 'SBD2KHEC3SEFU5BP3BQA57BT2EBAMZ5FRAJO7RF5QMSJ277OFAXAT2AC';
const vstruct = require('varstruct');
const base32 = require('base32.js');
const { Keypair } = require('stellar-base');

//=============
const { sign, encode, decode, verify, hash } = require('./lib/tx');

const Followings = vstruct([
  { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);


  let tx = {
    account: '  ',
    version: 1,
    sequence: 13,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: {
        key : 'followings',
        value:Followings.encode({
          addresses: [
            base32.decode('GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW')
        
          ]
        })
    }
  };
 
  console.log(tx);
  sign(tx, secretKey);
  console.log(tx);
  console.log(encode(tx).toString('hex'));
  
  //  const result = await axios.post(
  //   https://gorilla.forest.network/broadcast_tx_commit?tx=0x27GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI%27%22
  // );

//console.log(Keypair.fromSecret(secretKey).publicKey());