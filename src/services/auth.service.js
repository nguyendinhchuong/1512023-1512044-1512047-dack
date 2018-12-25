import axios from 'axios';

import BlockchainAPI from '../configs/BlockchainAPI';

export default class Singleton {
    static instance;

    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }

        this.isAuthenticated = localStorage.getItem('publicKey') !== null;
        Singleton.instance = this;
    }

    async login(formData, cb) {
        if (this.isAuthenticated) {
            throw Error("Account has already been logged in!");
        }
        const { publicKey } = formData;
        const { data: { result: { total_count } } } = await axios.get(`${BlockchainAPI.baseRoute}/tx_search?query="account=%27${publicKey}%27"`);

        if (parseInt(total_count, 10) !== 0) {
            this.isAuthenticated = true;
            localStorage.setItem('publicKey', publicKey);
        }
        cb(this.isAuthenticated);
    }

    async logout(formData, cb) {
        if (!this.isAuthenticated) {
            throw Error("Account has not been logged in!");
        }

        localStorage.removeItem('publicKey');
        localStorage.removeItem('secretKey');
        this.isAuthenticated = false;
        cb();
    }
}