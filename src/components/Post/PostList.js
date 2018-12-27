import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem'
import { decode } from '../../lib/tx'


import { fetchTweets } from '../../actions/tweetActions'
import Axios from 'axios';
import BlockchainAPI from '../../configs/BlockchainAPI';
class PostList extends Component {
    constructor() {
        super();
        this.state = {
            timeLine: [],
            post: 0,
            
        }
    }
    componentDidMount = () => {
        let publicKey = localStorage.getItem('publicKey')
        let tweets = []
        let { timeLine, post } = this.state
        Axios.get(BlockchainAPI.baseRoute + '/tx_search?query=%22account=%27' + publicKey + '%27%22')
            .then(res => {
                res.data.result.txs.map((block) => {
                    let txDec = Buffer.from(block.tx, 'base64')
                    let decResult = decode(txDec)
                    if (decResult.account === publicKey) {
                        switch (decResult.operation) {
                            case 'create_account':
                                let createAccountMess = publicKey + ' da tao tai khoan ' + decResult.params.address
                                timeLine.push(createAccountMess)
                                break;
                            case 'payment':
                                let paymentMess = publicKey + ' da chuyen ' + decResult.params.amount + ' CEL cho ' + decResult.params.address
                                timeLine.push(paymentMess)
                                break;
                            case 'update_account':
                                if (decResult.params.key === 'name') {
                                    let updateMess = decResult.account + ' da doi ten thanh ' + decResult.params.value.toString('utf-8')
                                    timeLine.push(updateMess)
                                } else if (decResult.params.key === 'picture') {
                                    let updateMess = decResult.account + ' da cap nhat anh dai dien '
                                    timeLine.push(updateMess)
                                } else if (decResult.params.key === 'followings') {
                                    let updateMess = decResult.account + ' bat dau theo doi'
                                    timeLine.push(updateMess)
                                }
                                break;
                            case 'post':
                                let content = Buffer.from(decResult.params.content, 'utf-8').toString();
                                tweets.push(content)
                                this.props.fetchTweets(tweets);
                                timeLine.push(content)
                                post = post + 1
                                this.setState({
                                    post: post
                                })
                                break

                            default:
                                break;
                        }
                    } else {
                        switch (decResult.operation) {
                            case 'create_account':
                                let createAccountMess = decResult.account + ' da tao tai khoan cho ' + decResult.params.address
                                timeLine.push(createAccountMess)
                                break;
                            case 'payment':
                                let paymentMess = decResult.account + ' da chuyen ' + decResult.params.amount + ' CEL cho ' + decResult.params.address
                                timeLine.push(paymentMess)
                                break;

                            default:
                                break;
                        }
                    }
                    this.setState({
                        timeLine: timeLine
                    })
                })
            })
    }

    render() {
        return (
            <div>
                <div className="panel-body">
                    {
                        this.state.timeLine.map((tweet, index) => <PostItem user={this.props.user} tweet={tweet} key={index} />)
                    }
                </div>
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        tweets: state.tweetReducer.tweets
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchTweets: (data) => {
            dispatch(fetchTweets(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);