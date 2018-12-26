import React, { Component } from 'react'
import { Link } from "react-router-dom"

import axios from 'axios'
import { decode } from '../../lib/tx'
import { connect } from 'react-redux'
import { fetchUserData } from '../../actions/userActions'
import { fetchFollowingList } from '../../actions/followActions'



class FollowingBox extends Component {
    constructor() {
        super();
    }
    
    render() {
        console.log(this.props.followingList)
        return (
            <div>
                <div className="panel panel-default panel-custom trends">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Followings
                    </h3>
                    </div>
                    <div className="panel-body">
                        {
                            this.props.followingList.map((following) => {
                                let background = following.profilePhoto;
                                let style = {
                                    witdh: "50%",
                                    heigth:"50%",
                                    backgroundImage: `url(${background})`
                                }
                                return (
                                    <div className="row" >
                                        <div className="col-md-6" style={style}>{following.name}</div>
                                        <div className="col-md-6"></div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        followingList: state.followReducer.followings
    }
}


export default connect(mapStateToProps)(FollowingBox);