import React, { Component } from 'react'
import { connect } from "react-redux";
import UserInfo from '../Layout/UserInfo';
import axios from 'axios'
import BlockchainAPI from '../../configs/BlockchainAPI'
import { decode } from '../../lib/tx'

class HistoryDetailPage extends Component {
    state = {
        hashResult: null,
        txResult: null
    }
    componentDidMount = () => {
        axios.get(BlockchainAPI.baseRoute + '/tx?hash=0x' + this.props.match.params.hashid)
            .then(res => {
                // console.log(res.data.result.tx)
                let txDec = Buffer.from(res.data.result.tx, 'base64')
                let decResult = decode(txDec)
                this.setState({
                    txResult: decResult,
                    hashResult: res.data.result
                });
            })
    }
    render() {
        const { txResult, hashResult } = this.state
        let detail = null
        if (hashResult && txResult) {
            detail = (
                <div>
                    <p><strong>Account: </strong> {txResult.account}</p>
                    <p><strong>Sequence: </strong> {txResult.sequence}</p>
                    <p><strong>Height: </strong> {hashResult.height}</p>
                    <p><strong>Hash: </strong> {hashResult.hash}</p>
                    <p><strong>Operation: </strong> {txResult.operation}</p>
                    <p><strong>Memo: </strong> {txResult.memo.toString('utf-8')}</p>
                    <p><strong>Params: </strong></p>
                    <pre>{JSON.stringify(txResult.params, null, 2)}</pre>
                </div>
            )
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <UserInfo />
                        </div>
                        <div className="col-sm-9">
                            <div className="panel panel-default panel-custom trends">
                                <div className="panel-heading">
                                    <h3>Transaction</h3>
                                </div>
                                <div className="panel-body">
                                    {
                                        (detail) ? detail : null
                                    }
                                </div>
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
        user: state.userReducer
    }
}

export default connect(mapStateToProps, null)(HistoryDetailPage)
