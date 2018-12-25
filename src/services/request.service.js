import axios from 'axios';
import vstruct from 'varstruct';
import base32 from 'base32.js';

import BlockchainAPI from '../configs/BlockchainAPI';
import { sign, encode } from '../lib/tx';
import { Keypair } from 'stellar-base';

const secretKey = 'SCW3IM6XRZGUGQPL3JDKPAJBQSCCB7TWEEFVCMUQXSVWP43SEWZDBR2Q';

const Followings = vstruct([
  { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);

export default class BlockchainRequest {
    static latestSequence;
    static publicKey = localStorage.getItem('publicKey');

    static async getLatestSequence() {
        const { data: { result: { total_count } } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${BlockchainRequest.publicKey}%27"`);
        BlockchainRequest.latestSequence = total_count;
    }

    static async makeFollowing(otherPublicKey) {
        console.log('>>>', otherPublicKey);
        let tx = {
            account: BlockchainRequest.publicKey,
            version: 1,
            sequence: ++BlockchainRequest.latestSequence,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: Followings.encode({
                    addresses: [
                        base32.decode('GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW')

                    ]
                })
            }
        };//ua s ben test, account = '   ' v, k phai la publicKey a? e tuong phai la public Key chu @@
        sign(tx, secretKey);
        encode(tx).toString('hex');
        await axios.post(`${BlockchainAPI.baseRoute}/broadcast_tx_commit?tx=0x${tx}`);
    }
}