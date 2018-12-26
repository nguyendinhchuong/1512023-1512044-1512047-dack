import React, { Component } from 'react'
import UserInfo from '../Layout/UserInfo';
import { connect } from 'react-redux'
import { encode, sign } from '../../lib/tx'
import Axios from 'axios'
import BlockchainAPI from '../../configs/BlockchainAPI'

class ExchangePage extends Component {
  state = {
    publicKey: null,
    amount: null,
    isSubmit: false,
    errMess: null
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.publicKey && this.state.amount) {
      let crawTx = {
        "version": 1,
        "account": this.props.user.account,
        "sequence": this.props.user.sequence + 1,
        "memo": Buffer.alloc(0),
        "operation": "payment",
        "params": {
          "address": this.state.publicKey,
          "amount": parseInt(this.state.amount, 10)
        },
      }
      let secretKey = localStorage.getItem('secretKey')
      sign(crawTx, secretKey)
      let encodedTx = encode(crawTx).toString('base64')
      Axios.post(BlockchainAPI.baseRoute,
        {
          "method": "broadcast_tx_sync",
          "jsonrpc": "2.0",
          "params": [`${encodedTx}`],
          "id": "dontcare"
        }).then(res => {
          this.setState({
            errMess: res.data.result.log,
            isSubmit: true
          })
        })
    }
  }
  render() {
    const { isSubmit, errMess } = this.state
    let alertMess = null
    if (isSubmit) {
      if (errMess.length > 1) {
        alertMess = <div className="alert alert-danger">
          {errMess}
        </div>
      } else {
        alertMess = <div className="alert alert-success">
          <strong>Success!</strong> Amount has been sent
    </div>
      }
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <UserInfo />
          </div>
          <div className="col-sm-9">
            <div className="panel panel-default panel-custom trends">
              <div className="panel-heading">
                <h3 className="panel-title">
                  Exchange
                    </h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group mt-10">
                    <label>Public Key</label>
                    <input type="text" name="publicKey" className="form-control width-500" onChange={this.handleChange} ref="publicKey" />
                  </div>
                  <div className="form-group mt-10">
                    <label>Amount</label>
                    <input type="text" name="amount" className="form-control width-500" onChange={this.handleChange} ref="amount" />
                  </div>
                  <button type="submit" className="btn btn-info">Send</button>
                </form>
                <br></br>
                {
                  (alertMess ? alertMess : null)
                }

                <div className="exchange-table">
                  <h3>Exchange History</h3>
                  <br></br>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.user.exchange.map((transaction, index) => {
                          return (
                            <tr key={index}>
                              <td>{transaction.from}</td>
                              <td>{transaction.to}</td>
                              <td>{transaction.amount}</td>
                            </tr>
                          )
                        })
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

export default connect(mapStateToProps, null)(ExchangePage)