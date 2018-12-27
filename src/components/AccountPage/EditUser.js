import React, { Component } from 'react'
import { connect } from 'react-redux';
import { encode, sign } from '../../lib/tx'
import Axios from 'axios'
import BlockchainAPI from "../../configs/BlockchainAPI";
import FollowBox from '../Layout/FollowBox';
import UserInfo from '../Layout/UserInfo';

class EditUser extends Component {
    constructor(props) {
        super();
        this.state = {
            profilePicture: null,
            imageBinary: null,
            file: null,
            name: null,
            isSubmit: false,
            errMess: null,
            imgResize: null
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
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = 300;
                canvas.height = 300;
                // limit the image to 150x100 maximum size
                var maxW = 150;
                var maxH = 100;
                var img = new Image();
                img.onload = () => {
                    var iw = img.width;
                    var ih = img.height;
                    var scale = Math.min((maxW / iw), (maxH / ih));
                    var iwScaled = iw * scale;
                    var ihScaled = ih * scale;
                    canvas.width = iwScaled;
                    canvas.height = ihScaled;
                    ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
                    this.setState({
                        imgResize: canvas.toDataURL()
                    }, () => {
                        let dataDecode = (this.state.imgResize).split(',')[1]
                        this.setState({
                            imageBinary: dataDecode
                        })
                    })
                }
                img.src = URL.createObjectURL(file);
                this.setState({
                    profilePicture: reader.result
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
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <UserInfo />
                        </div>
                        <div className="col-sm-6">
                            <div className="panel panel-default panel-custom user-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">
                                        Change Profile Info
                        </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="media">
                                        {(profilePicture ? <img src={this.state.profilePicture} alt="#" className="profilePicture" /> : null)}
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
                        </div>
                        <div className="col-sm-3">
                            <FollowBox />
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