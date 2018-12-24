import React, { Component } from 'react'
import UserInfo from '../../components/Layout/UserInfo';
import FollowBox from '../../components/Layout/FollowBox';
import PostBox from '../../components/Post/PostBox';
import PostList from '../../components/Post/PostList';

import axios from 'axios'
import {decode} from '../../lib/tx'

class HomePage extends Component {
    componentDidMount = () => {
        let accountInfo = {
            account: null,
            sequence: 0,
            amount: 0,
            name: null
        }
        let publicKey = 'GC26I5WNQ5HYNYDIPPAOSX5W7FSJRYRLEFQF56V7MX4TFDHHEZDK7KZW'
        accountInfo.account = publicKey
        axios.get('https://komodo.forest.network/tx_search?query=%22account=%27' + publicKey + '%27%22')
            .then(res => {
                res.data.result.txs.map((block, index) => {
                    // decode tx ra base64 moi bo vo ham decode
                    let txDec = Buffer.from(block.tx, 'base64')
                    let decResult = decode(txDec)
                    if (decResult.account === publicKey) {
                        switch (decResult.operation) {
                            case 'create_account':
                                console.log('create_account')
                                accountInfo.name = decResult.params.address
                                accountInfo.sequence = accountInfo.sequence + 1
                                break;
                            case 'payment':
                                console.log('payment')
                                console.log(decResult.params.amount)
                                accountInfo.amount = accountInfo.amount - decResult.params.amount
                                accountInfo.sequence = accountInfo.sequence + 1
                                break;
                            case 'update_account':
                                console.log('update_account')
                                if (decResult.params.key === 'name') {
                                    accountInfo.name = decResult.params.value.toString('utf-8')
                                }
                                accountInfo.sequence = accountInfo.sequence + 1
                                break;

                            default:
                                break;
                        }
                    } else {
                        switch (decResult.operation) {
                            case 'create_account':
                                console.log('create_account')
                                accountInfo.name = decResult.params.address
                                break;
                            case 'payment':
                                console.log('payment')
                                console.log(decResult.params.amount)
                                accountInfo.amount = accountInfo.amount + decResult.params.amount
                                break;

                            default:
                                break;
                        }
                    }
                })
            })
            .then(() => {
                console.log(accountInfo)
            })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <UserInfo />
                        </div>
                        <div className="col-sm-6">
                            <div className="panel panel-info">
                                <PostBox />
                                <PostList />
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="col-sm-3">
                            <FollowBox />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;