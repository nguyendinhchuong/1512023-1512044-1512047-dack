import React, { Component } from 'react'
import UserInfo from '../Layout/UserInfo'
import { connect } from 'react-redux'
import { encode, sign } from '../../lib/tx'
import Axios from 'axios'
import BlockchainAPI from '../../configs/BlockchainAPI'

class CreateAccountPage extends Component {
  state = {
    publicKey: null,
    isSubmit: false,
    errMess: null
  }
  handleChange = (e) => {
    this.setState({
      publicKey: e.target.value,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.publicKey) {
      let crawTx = {
        "version": 1,
        "account": this.props.user.account,
        "sequence": this.props.user.sequence + 1,
        "memo": Buffer.alloc(0),
        "operation": "create_account",
        "params": {
          "address": this.state.publicKey,
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
          <strong>Success!</strong> Account has been created
    </div>
      }
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
                  <h3 className="panel-title">
                    Please enter public key to create account:
                    </h3>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group mt-10">
                      <label>Public Key</label>
                      <input type="text" name="publicKey" className="form-control width-500" onChange={this.handleChange} ref="publicKey" />
                    </div>
                    <button type="submit" className="btn btn-info">Create account</button>
                  </form>
                  <br></br>
                  <br></br>
                  {
                    (alertMess ? alertMess : null)
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

export default connect(mapStateToProps, null)(CreateAccountPage)