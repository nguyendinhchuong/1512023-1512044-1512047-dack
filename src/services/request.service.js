import axios from 'axios';
import vstruct from 'varstruct';
import base32 from 'base32.js';

import { baseRoute } from '../configs/BlockchainAPI';
import { sign, encode, decode } from '../lib/tx/index';
import { AsyncSeriesHook } from 'tapable';

const secretKey = 'SCW3IM6XRZGUGQPL3JDKPAJBQSCCB7TWEEFVCMUQXSVWP43SEWZDBR2Q';

const Followings = vstruct([{
    name: 'addresses',
    type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35))
}, ]);

export default class Blockchain {
    static latestSequence;
    static publicKey = localStorage.getItem('publicKey');
    static rawData;

    static async getLatestSequence() {
        const { data } = await axios.get(`${baseRoute}/tx_search?query="account=%27${Blockchain.publicKey}%27"`);
        const { result } = data;
    
        Blockchain.rawData = result;
        Blockchain.latestSequence = result.txs.reduce(function (acc, block) {
            console.log(decode(Buffer.from(block.tx, 'base64')).account);
            return decode(Buffer.from(block.tx, 'base64')).account === Blockchain.publicKey ? acc + 1 : acc + 1;
        }, 0);
    }

    static async makeFollowing(currentFollowings) {
        if (!Array.isArray(currentFollowings)) {
            throw Error('Argument must be a array instance');
        }

        let tx = {
            account: Blockchain.publicKey,
            version: 1,
            sequence: ++Blockchain.latestSequence,
            //sequence: 29,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: Followings.encode({
                    //addresses: currentFollowings.map(x => Buffer.from(base32.decode(x)))
                     addresses: [
                         Buffer.from(base32.decode('GBOVRS6DWD56GOIEYHFFYRLUBCV3JPQXRZ7YY4B34IHK6KWO4MQXGNZF'))

                     ]
                })
            }
        };
        console.log('>>', tx.sequence);
        sign(tx, secretKey);
        tx = encode(tx).toString('hex');
        console.log(tx);
        await axios.post(`${baseRoute}/broadcast_tx_commit?tx=0x${tx}`);
    }

    static fetchFollowings() {
        let chainLength = Blockchain.rawData.txs.length;

        for (let i = chainLength - 1; i >= 0; i--) {
            let decResult = decode(Buffer.from(Blockchain.rawData.txs[i].tx, 'base64'));
            if (decResult.account === Blockchain.publicKey
                && decResult.operation === 'update_account'
                && decResult.params.key === 'followings') {
                return Followings.decode(decResult.params.value).addresses.map(code => base32.encode(code));
            }
        }
    }

    static fetchFollowers() {
        let chainLength = Blockchain.rawData.txs.length;
        let setOfUsers = new Set();

        let followers = [];
        for (let i = chainLength - 1; i >= 0; i--) {
            let decResult = decode(Buffer.from(Blockchain.rawData.txs[i].tx, 'base64'));
            if (decResult.account !== Blockchain.publicKey
                && !setOfUsers.has(decResult.account)
                && decResult.operation === 'update_account'
                && decResult.params.key === 'followings') {
                setOfUsers.add(decResult.account);
                if (Followings.decode(decResult.params.value).addresses.map(code => base32.encode(code)).indexOf(Blockchain.publicKey) !== -1) followers.push(decResult.account);
            }
        }
        return followers;
    }
}