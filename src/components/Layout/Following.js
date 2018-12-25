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
                        <div className="row">
                            <div className="col-md-6">A</div>
                            <div className="col-md-6">B</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">C</div>
                            <div className="col-md-6">D</div>
                        </div>
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