import axios from 'axios';
import vstruct from 'varstruct';
import base32 from 'base32.js';

import BlockchainAPI from '../configs/BlockchainAPI';
import { sign, encode, decode } from '../lib/tx/index';
import { AsyncSeriesHook } from 'tapable';

const secretKey = localStorage.getItem('secretKey');

const Followings = vstruct([{
    name: 'addresses',
    type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35))
}, ]);

export default class Blockchain {
    static latestSequence;
    static publicKey = localStorage.getItem('publicKey');
    static rawData;

    static async getLatestSequence() {
        Blockchain.publicKey = localStorage.getItem('publicKey');
        const { data } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${Blockchain.publicKey}%27"`);
        const { result } = data;
    
        Blockchain.rawData = result;
        Blockchain.latestSequence = result.txs.reduce(function (acc, block) {
            return decode(Buffer.from(block.tx, 'base64')).account === Blockchain.publicKey ? acc + 1 : acc;
        }, 0);
    }

    static async makeFollowing(currentFollowings) {
        if (!Array.isArray(currentFollowings)) {
            throw Error('Argument must be an array');
        }
        // currentFollowings = ['GBQSMCJUG63VXHPH6HCJODRPEA65B4C47PNHOMIXSYYAAHTUS2A24YJU'];
        let tx = {
            account: Blockchain.publicKey,
            version: 1,
            sequence: ++Blockchain.latestSequence,
            memo: Buffer.alloc(0),
            operation: 'update_account',
            params: {
                key: 'followings',
                value: Followings.encode({
                    addresses: currentFollowings.map(x => Buffer.from(base32.decode(x))) 

                })
            }
        };
        sign(tx, secretKey);
        let temp = encode(tx).toString('hex');
        console.log(tx.sequence);
        console.log(temp);
        await axios.post(`${BlockchainAPI.baseRoute}/broadcast_tx_commit?tx=0x${temp}`);
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

    static async fetchFollowers() {
        let setOfUsers = new Set();
        let followers = [];

        for (let publicKey of BlockchainAPI.users) {
            const { data: { result } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`);
            for (let i = result.txs.length - 1; i >= 0; i--) {
                let decResult = decode(Buffer.from(result.txs[i].tx, 'base64'));
                if (decResult.account !== Blockchain.publicKey
                    && !setOfUsers.has(decResult.account)
                    && decResult.operation === 'update_account'
                    && decResult.params.key === 'followings'
                ) {
                    setOfUsers.add(decResult.account);
                   if (Followings.decode(decResult.params.value).addresses.map(code => base32.encode(code)).indexOf(Blockchain.publicKey) !== -1) followers.push(decResult.account);
                }
            }
        }
        return followers;
    }

    static async getName(publicKey) {
        const { data: { result } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`);
        for (let i = result.txs.length - 1; i >= 0; i--) {
            let decResult = decode(Buffer.from(result.txs[i].tx, 'base64'));
            if (decResult.operation === 'update_account' && decResult.params.key === 'name') {
                return decResult.params.value.toString('utf-8');
            }
        }
        return publicKey;
    }
    static async getProfilePicture(publicKey) {
        const { data: { result } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`);
        for (let i = result.txs.length - 1; i >= 0; i--) {
            let decResult = decode(Buffer.from(result.txs[i].tx, 'base64'));
            if (decResult.operation === 'update_account' && decResult.params.key === 'picture') {
                let imgPath =  "data:image/jpg;base64," + decResult.params.value.toString('base64')
                return  imgPath
            }
        }
        return 'http://placehold.it/500x500';
    }
}