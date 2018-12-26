import React, { Component } from 'react'
import UserInfo from '../Layout/UserInfo';
import axios from 'axios'
import BlockchainAPI from '../../configs/BlockchainAPI'
import { connect } from "react-redux";
import { fetchUserData } from '../../actions/userActions'

class HistoryPage extends Component {
    componentDidMount = () => {
        let newUser = { ...this.props.user }
        console.log(newUser)
        newUser.transactions.map(block => {
            axios.get(BlockchainAPI.baseRoute + '/block?height=' + block.height)
                .then(res => {
                    // console.log(res.data.result.block_meta.header.time)
                    block.time = res.data.result.block_meta.header.time
                })
                .then(() => {
                    this.props.fetchUserData(newUser)
                })
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <UserInfo />
                    </div>
                    <div className="col-sm-9">
                        <div className="panel panel-default panel-custom trends">
                            <div className="panel-heading">
                            </div>
                            <div className="panel-body">
                                <div className="history-table">
                                    <h3>Exchange History</h3>
                                    <br></br>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Height</th>
                                                <th>Time</th>
                                                <th>Hash</th>
                                                <th>Operation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (this.props.user.transactions.length > 0) ?
                                                    this.props.user.transactions.map((transaction, index) => {
                                                        console.log(transaction)
                                                        return (
                                                            <tr key={index}>
                                                                <td>{transaction.height}</td>
                                                                <td>{transaction.time}</td>
                                                                <td>{transaction.hash}</td>
                                                                <td>{transaction.operation}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    : null

                                            }
                                        </tbody>
                                    </table>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserData: (time) => {
            dispatch(fetchUserData(time))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)