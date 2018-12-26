import React, { Component } from 'react'
import { Link } from "react-router-dom"

import axios from 'axios'

import { connect } from 'react-redux'
import { fetchUserData } from '../../actions/userActions'
import BlockchainAPI from '../../configs/BlockchainAPI';
const { decode } = require('../../lib/tx');


class UserInfo extends Component {
    componentDidMount = () => {
        let accountInfo = {
            account: null,
            sequence: 0,
            amount: 0,
            name: null,
            exchange: []
        }
        let publicKey = localStorage.getItem('publicKey')
        accountInfo.account = publicKey //trơớc đó nó để key cứng, giờ phải chỉnh lãi theo key đăng nhập, mà bug cmnr :vđể a clone lại xem 
        accountInfo.name = publicKey
        axios.get(BlockchainAPI.baseRoute + '/tx_search?query=%22account=%27' + publicKey + '%27%22')
            .then(res => {
                res.data.result.txs.map((block, index) => {
                    // decode tx ra base64 moi bo vo ham decode
                    let txDec = Buffer.from(block.tx, 'base64')
                    let decResult = decode(txDec)
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
                                }
                                accountInfo.sequence = accountInfo.sequence + 1
                                break;

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
                        <Link to="/user/info"><img className="img-responsive" alt="demo" src="http://placehold.it/500x500" /></Link>
                        <div className="user-info">
                            <h4><Link to={"/user/"+ this.props.user.name}>{this.props.user.name}</Link></h4>
                            <p><strong>Balance: </strong> {this.props.user.amount} CEL</p>
                            <p> = {this.props.user.amount / 100000000} TRE</p>
                            <p><strong>Energy:</strong></p>
                            <p><strong>Sequence: </strong> {this.props.user.sequence}</p>
                        </div>
                        <div className="row">
                            <div className="col-xs-3 tweets-tag">
                                <h5>
                                    <p>TWEETS</p>
                                    <p>1,545</p>
                                </h5>
                            </div>
                            <div className="col-xs-4 following-tag">
                                <Link to="/user/following" >
                                    <h5>
                                        <p>FOLLOWING</p>
                                        <p>{this.props.follow.followingNum}</p>
                                    </h5>
                                </Link>
                            </div>
                            <div className="col-xs-5 followers-tag">
                                <Link to="/user/followers" >
                                    <h5>
                                        <p>FOLLOWERS</p>
                                        <p>{this.props.follow.followerNum}</p>
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
        follow: state.followReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserData: (data) => {
            dispatch(fetchUserData(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);