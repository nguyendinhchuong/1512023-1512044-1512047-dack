import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem'
import { decode } from '../../lib/tx'


import { fetchTweets } from '../../actions/tweetActions'
import { getUserCreation } from '../../actions/userActions'
import Axios from 'axios';
import BlockchainAPI from '../../configs/BlockchainAPI';
class PostList extends Component {
    constructor() {
        super();
        this.state = {
            timeLine: []
        }
    }
    componentDidMount = () => {

        // Axios.get(BlockchainAPI.baseRoute +
        //     "/block?height=" + this.state.maxHeight
        // ).then(res => {
        //     if (res.data.error === undefined) {
        //         if (res.data.result.block.data.txs !== null) {
        //             const raw = res.data.result.block.data.txs[0];
        //             const buf = Buffer.from(raw, 'base64');
        //             const post = decode(buf);
        //             console.log(post)
        //             if (post.operation === 'post') {
        //                 post.params.content = Buffer.from(post.params.content, 'utf-8').toString();
        //                 this.props.fetchTweets(post);
        //             }

        //         }
        //     }
        //     this.setState({ maxHeight: this.state.maxHeight + 1 })
        // })
        let publicKey = localStorage.getItem('publicKey')
        Axios.get(BlockchainAPI.baseRoute + '/tx_search?query=%22account=%27' + publicKey + '%27%22')
            .then(res => {
                res.data.result.txs.map((block, index) => {
                    let txDec = Buffer.from(block.tx, 'base64')
                    let decResult = decode(txDec)
                    if (decResult.account === publicKey) {
                        switch (decResult.operation) {
                            case 'create_account':
                                let createAccountMess = publicKey + ' da tao tai khoan ' + decResult.params.address
                                console.log(createAccountMess)
                                break;
                            case 'payment':
                                let paymentMess = publicKey + ' da chuyen ' + decResult.params.amount + ' CEL cho ' + decResult.params.address
                                console.log(paymentMess)
                                break;
                            case 'update_account':
                                if (decResult.params.key === 'name') {
                                    let updateMess = decResult.account + ' da doi ten thanh ' + decResult.params.value.toString('utf-8')
                                    console.log(updateMess)
                                } else if (decResult.params.key === 'picture') {
                                    let updateMess = decResult.account + ' da cap nhat anh dai dien '
                                    console.log(updateMess)
                                }
                                break;
                            case 'post':
                                let postMess = decResult.account + ' da them bai viet '
                                console.log(postMess)
                                break

                            default:
                                break;
                        }
                    } else {
                        switch (decResult.operation) {
                            case 'create_account':
                                let createAccountMess = decResult.account + ' da tao tai khoan cho ' + decResult.params.address
                                console.log(createAccountMess)
                                break;
                            case 'payment':
                                let paymentMess = decResult.account + ' da chuyen ' + decResult.params.amount + ' CEL cho ' + decResult.params.address
                                console.log(paymentMess)
                                break;

                            default:
                                break;
                        }
                    }
                    return 0
                })
            })
    }

    render() {
        return (
            <div>
                <div className="panel-body">
                    {
                        this.props.tweets.reverse().map((tweet, index) => <PostItem user={this.props.user} tweet={tweet} key={index} />)
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
export default connect(mapStateToProps)(PostList);