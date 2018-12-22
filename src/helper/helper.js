const vstruct = require('varstruct');
const crypto = require('crypto');
const { Keypair } = require('stellar-base');
const v1 = require('./v1');
const base32 = require('base32.js');
let { RpcClient } = require('tendermint')

let client = RpcClient('https://komodo.forest.network:443')

const Transaction = vstruct([
    { name: 'version', type: vstruct.UInt8 },
]);

function encode(tx) {
    switch (tx.version) {
        case 1:
            return v1.encode(tx);

        default:
            throw Error('Unsupport version');
    };
}

function decode(data) {
    const versionTx = Transaction.decode(data);
    switch (versionTx.version) {
        case 1:
            return v1.decode(data);

        default:
            throw Error('Unsupport version');
    }
}

function getUnsignedHash(tx) {
    return crypto
        .createHash('sha256')
        .update(encode({
            ...tx,
            signature: Buffer.alloc(64, 0),
        }))
        .digest();
}

function sign(tx, secret) {
    const key = Keypair.fromSecret(secret);
    tx.account = key.publicKey();
    tx.signature = key.sign(getUnsignedHash(tx));
}

function verify(tx) {
    const key = Keypair.fromPublicKey(tx.account);
    return key.verify(getUnsignedHash(tx), tx.signature);
}

function hash(tx) {
    return tx.hash = crypto.createHash('sha256')
        .update(encode(tx))
        .digest()
        .toString('hex')
        .toUpperCase();
}

let secretKey = 'SBD2KHEC3SEFU5BP3BQA57BT2EBAMZ5FRAJO7RF5QMSJ277OFAXAT2AC'
let publicKey = 'GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW'
let crawTx = {
    version: 1,
    "account": publicKey,
    "sequence": 3,
    "memo": Buffer.alloc(0),
    "operation": "payment",
    "params": {
        "address": "GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR",
        "amount": 10
    },
}
// let crawTx = {
//     version: 1,
//     "account": publicKey,
//     "sequence": 4,
//     "memo": Buffer.alloc(0),
//     "operation": "create_account",
//     "params": {
//         "address": "GALSPETF2F4RO6AGNSRC5CTJ5J5SY4OK2D74RXZSD2NUZIQGR2R34NV7",
//     },
// }
// let crawTx = {
//     version: 1,
//     "account": publicKey,
//     "sequence": 5,
//     "memo": Buffer.alloc(0),
//     "operation": "update_account",
//     "params": {
//         "key": "name",
//         "value": new Buffer("Ngoc Bao", "utf-8")
//     },
// }

sign(crawTx, secretKey)
const hashTx = hash(crawTx)
console.log('hash:   ' + hashTx)
let broadcast = encode(crawTx).toString('hex')

let reqTx = '0x' + broadcast
client.broadcastTxSync({ tx: reqTx })
    .then((res) => console.log(res))