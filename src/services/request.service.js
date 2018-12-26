import axios from 'axios';
import vstruct from 'varstruct';
import base32 from 'base32.js';

import BlockchainAPI from '../configs/BlockchainAPI';
import { sign, encode, decode } from '../lib/tx/index';

const secretKey = 'SCW3IM6XRZGUGQPL3JDKPAJBQSCCB7TWEEFVCMUQXSVWP43SEWZDBR2Q';

const Followings = vstruct([
  { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);

export default class Blockchain {
    static latestSequence;
    static publicKey = localStorage.getItem('publicKey');
    static rawData;

    static async getLatestSequence() {
        const { data } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${Blockchain.publicKey}%27"`);
        const { result } = data;
        const { total_count } = result;

        Blockchain.rawData = result;
        Blockchain.latestSequence = total_count;
    }

    static async makeFollowing(otherPublicKey) {
        let tx = {
            account: Blockchain.publicKey,
            version: 1,
            sequence: ++Blockchain.latestSequence,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: Followings.encode({
                    addresses: [
                        base32.decode(otherPublicKey)
                    ]
                })
            }
        };
        sign(tx, secretKey);
        encode(tx).toString('hex');
        await axios.post(`${BlockchainAPI.baseRoute}/broadcast_tx_commit?tx=0x${tx}`);
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