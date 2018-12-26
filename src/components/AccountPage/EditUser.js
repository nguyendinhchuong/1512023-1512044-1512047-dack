import React, { Component } from 'react'
import { connect } from 'react-redux';
import { encode, sign } from '../../lib/tx'
import Axios from 'axios'
import BlockchainAPI from "../../configs/BlockchainAPI";

class EditUser extends Component {
    constructor(props) {
        super();
        this.state = {
            profilePicture: null,
            imageBinary: null,
            file: null,
            name: null,
            isSubmit: false,
            errMess: null
        }
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name) {
            let crawTx = {
                "version": 1,
                "account": this.props.user.account,
                "sequence": this.props.user.sequence + 1,
                "memo": Buffer.alloc(0),
                "operation": "update_account",
                "params": {
                    "key": "name",
                    "value": new Buffer(this.state.name, "utf-8")
                },
            }
            let secretKey = localStorage.getItem('secretKey')
            sign(crawTx, secretKey)
            let encodedTx = encode(crawTx).toString('base64')
            console.log(crawTx)
            console.log(encodedTx)
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
        } else {
            this.setState({
                errMess: 'No name input',
                isSubmit: true
            })
        }
    }
    fileSelectedHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        }, () => {
            let { file } = this.state
            let reader = new FileReader()
            reader.onloadend = () => {
                var data = (reader.result).split(',')[1];
                this.setState({
                    profilePicture: reader.result,
                    imageBinary: data
                })
            }
            reader.readAsDataURL(file)
        })
    }

    handleSubmitImage = (e) => {
        e.preventDefault()
        let { imageBinary } = this.state
        if (this.state.profilePicture) {
            let crawTx = {
                "version": 1,
                "account": this.props.user.account,
                "sequence": this.props.user.sequence + 1,
                "memo": Buffer.alloc(0),
                "operation": "update_account",
                "params": {
                    "key": "picture",
                    "value": new Buffer(imageBinary, "base64"),
                },
            }
            let secretKey = localStorage.getItem('secretKey')
            sign(crawTx, secretKey)
            let encodedTx = encode(crawTx).toString('base64')
            console.log(crawTx)
            console.log(encodedTx)
            Axios.post(BlockchainAPI.baseRoute,
                {
                    "method": "broadcast_tx_sync",
                    "jsonrpc": "2.0",
                    "params": [`${encodedTx}`],
                    "id": "dontcare"
                }).then(res => {
                    console.log(res.data)
                    this.setState({
                        errMess: res.data.result.log,
                        isSubmit: true
                    })
                })
        } else {
            this.setState({
                errMess: 'No picture input',
                isSubmit: true
            })
        }
    }

    render() {
        const { isSubmit, errMess, profilePicture } = this.state
        let alertMess = null
        if (isSubmit) {
            if (errMess.length > 1) {
                alertMess = <div className="alert alert-danger">
                    {errMess}
                </div>
            } else {
                alertMess = <div className="alert alert-success">
                    <strong>Success!</strong> Account has been updated
        </div>
            }
        }
        return (
            <div>
                <div className="panel panel-default panel-custom user-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Change Profile Info
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="media">
                            {(profilePicture ? <img src={this.state.profilePicture} alt="#" /> : null)}
                            <form onSubmit={this.handleSubmitImage}>
                                <label >Profile Picture</label>
                                <input type="file" name="profilePicture" onChange={this.fileSelectedHandler} accept="image/*" />
                                <br></br>
                                <button type="submit" className="btn btn-info">Save changes</button>
                            </form>
                            <div className="media-body">
                                <br></br>
                                <br></br>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group mt-10">
                                        <label>Name</label>
                                        <input type="text" name="name" className="form-control width-300" onChange={this.handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-info">Save changes</button>
                                </form>
                                <br></br>
                            </div>
                            <br></br>
                            {
                                (alertMess ? alertMess : null)
                            }
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.userReducer });

const mapDispatchToProps = dispatch => ({
    updateUserInfo: info => dispatch({ type: 'UPDATE_PROFILE_INFO_FULFILLED', payload: info })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);