import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

const UserInfo = ({ user, follow }) => {
    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-body">
                    <Link to="/user/info"><img className="img-responsive" alt="demo" src="http://placehold.it/500x500" /></Link>
                    <div className="user-info">
                        <h4>{user.name}</h4>
                        <p><strong>Balance: </strong> {user.amount} CEL</p>
                        <p> = {user.amount / 100000000} TRE</p>
                        <p><strong>Energy:</strong></p>
                    </div>
                    <div className="row">
                        <div className="col-xs-3 tweets-tag">
                            <h5>
                                <p>TWEETS</p>
                                <p>1,545</p>
                            </h5>
                        </div>
                        <div className="col-xs-4 following-tag">
                            <Link to="/user/following" >
                                <h5>
                                    <p>FOLLOWING</p>
                                    <p>{follow.followingNum}</p>
                                </h5>
                            </Link>
                        </div>
                        <div className="col-xs-5 followers-tag">
                            <Link to="/user/followers" >
                                <h5>
                                    <p>FOLLOWERS</p>
                                    <p>{follow.followerNum}</p>
                                </h5>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        follow: state.followReducer
    }
}
export default connect(mapStateToProps)(UserInfo);