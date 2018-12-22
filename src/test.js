const transaction = require('./lib/transaction');
publicKey = "GCG34BG4ZPYARYHMYHVPJI2YW3AAJBGK7ZAZN3NSSL3AKADOZTNUQHX3"



//=============
const { sign, encode, decode, verify, hash } = require('../lib/tx');
  let tx = {
    account: 'GBOVRS6DWD56GOIEYHFFYRLUBCV3JPQXRZ7YY4B34IHK6KWO4MQXGNZF',
    version: 1,
    sequence: 1,
    memo: Buffer.alloc(0),
    operation: 'create_account',
    params: {
      address: 'GDEIQC56URB2H6YDQQIUSDMF4WZUO6RA3O2HISYNUTP6FDMU7LIPAP3V'
    }
  };
  console.log(tx);
  sign(tx, 'SD6AU6SN3JTOOM6ESNXVE5JRHYNNQF3UDH2QFFKKBIWAWNV2POAWMDFK');
  console.log(tx);
  console.log(encode(tx).toString('hex'));
  
  //  const result = await axios.post(
  //   https://gorilla.forest.network/broadcast_tx_commit?tx=_0x27GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI%27%22
  // );