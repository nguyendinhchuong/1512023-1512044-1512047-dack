import React, { Component } from 'react'
import { Link } from "react-router-dom"

import axios from 'axios'

import { connect } from 'react-redux'
import { fetchUserData } from '../../actions/userActions'
import BlockchainAPI from '../../configs/BlockchainAPI';
import Blockchain from '../../services/request.service';
const { decode } = require('../../lib/tx');


class UserInfo extends Component {
    componentDidMount = async () => {
        await Blockchain.getLatestSequence();

        this.props.setFollowingList(Blockchain.fetchFollowings() || []);
        this.props.setFollowerList(await Blockchain.fetchFollowers() || []);
        let accountInfo = {
            account: null,
            sequence: 0,
            amount: 0,
            name: null,
            exchange: [],
            photoUser: 'http://placehold.it/500x500',
            transactions: [],
            post: []
        }
        let publicKey = localStorage.getItem('publicKey')
        accountInfo.account = publicKey //trơớc đó nó để key cứng, giờ phải chỉnh lãi theo key đăng nhập, mà bug cmnr :vđể a clone lại xem 
        accountInfo.name = publicKey
        axios.get(BlockchainAPI.baseRoute + '/tx_search?query=%22account=%27' + publicKey + '%27%22')
            .then(res => {
                res.data.result.txs.map((block, index) => {
                    // decode tx ra base64 moi bo vo ham decode
                    let transaction = {
                        height: null,
                        hash: null,
                        operation: null,
                        time: null
                    }
                    transaction.height = block.height
                    transaction.hash = block.hash
                    let txDec = Buffer.from(block.tx, 'base64')
                    let decResult = decode(txDec)
                    transaction.operation = decResult.operation
                    accountInfo.transactions.push(transaction)
                    if (decResult.account === publicKey) {
                        switch (decResult.operation) {
                            case 'create_account':
                                // accountInfo.name = decResult.params.address
                                accountInfo.sequence = accountInfo.sequence + 1
                                break;
                            case 'payment':
                                accountInfo.amount = accountInfo.amount - decResult.params.amount
                                accountInfo.sequence = accountInfo.sequence + 1
                                let exchange = {
                                    'from': publicKey,
                                    'to': decResult.params.address,
                                    'amount': decResult.params.amount
                                }
                                accountInfo.exchange.push(exchange)
                                break;
                            case 'update_account':
                                if (decResult.params.key === 'name') {
                                    accountInfo.name = decResult.params.value.toString('utf-8')
                                } else if (decResult.params.key === 'picture') {
                                    accountInfo.photoUser = "data:image/jpg;base64," + decResult.params.value.toString('base64')
                                }
                                accountInfo.sequence = accountInfo.sequence + 1
                                break;
                            case 'post':
                                accountInfo.sequence = accountInfo.sequence + 1
                                break

                            default:
                                break;
                        }
                    } else {
                        switch (decResult.operation) {
                            case 'create_account':
                                accountInfo.name = decResult.params.address
                                break;
                            case 'payment':
                                accountInfo.amount = accountInfo.amount + decResult.params.amount
                                let exchange = {
                                    'from': decResult.account,
                                    'to': decResult.params.address,
                                    'amount': decResult.params.amount
                                }
                                accountInfo.exchange.push(exchange)
                                break;

                            default:
                                break;
                        }
                    }
                    return 0
                })
            })
            .then(() => {
                this.props.fetchUserData(accountInfo)
            })
    }
    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <Link to="/edit"><img className="img-responsive" alt="demo" src={this.props.user.photoUser} /></Link>
                        <div className="user-info">

                            <h4 className="userName"><Link to={"/account/" + this.props.user.account}>{this.props.user.name}</Link></h4>
                            <p><strong>Balance: </strong> {this.props.user.amount} CEL</p>
                            <p> = {this.props.user.amount / 100000000} TRE</p>
                            <p><strong>Energy:</strong></p>
                            <p><strong>Sequence: </strong> {this.props.user.sequence}</p>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 following-tag">
                                <Link to="/following" >
                                    <h5>
                                        <p>FOLLOWING</p>
                                        <p>{this.props.follow.followings.length}</p>
                                    </h5>
                                </Link>
                            </div>
                            <div className="col-xs-6 followers-tag">
                                <Link to="/followers" >
                                    <h5>
                                        <p>FOLLOWERS</p>
                                        <p>{this.props.follow.followers.length}</p>
                                    </h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        follow: state.followReducer,
        tweets: state.tweetReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserData: (data) => {
            dispatch(fetchUserData(data))
        },
        setFollowingList: list => dispatch({ type: 'FETCH_FOLLOWING_LIST', payload: list }),
        setFollowerList: list => dispatch({ type: 'FETCH_FOLLOWER_LIST', payload: list })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
