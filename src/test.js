
publicKey = "GCG34BG4ZPYARYHMYHVPJI2YW3AAJBGK7ZAZN3NSSL3AKADOZTNUQHX3"



//=============
const { sign, encode, decode, verify, hash } = require('./lib/tx');
  let tx = {
    account: '  ',
    version: 1,
    sequence: 1,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: {
        key : 'name',
        value: Buffer.from('M.Cong')
    }
  };
  console.log(tx);
  sign(tx, 'SCW3IM6XRZGUGQPL3JDKPAJBQSCCB7TWEEFVCMUQXSVWP43SEWZDBR2Q');
  console.log(tx);
  console.log(encode(tx).toString('hex'));
  
  //  const result = await axios.post(
  //   https://gorilla.forest.network/broadcast_tx_commit?tx=0x27GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI%27%22
  // );