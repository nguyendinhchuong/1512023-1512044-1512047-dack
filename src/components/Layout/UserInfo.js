import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

const UserInfo = ({user, follow}) => {
    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-body">
                    <Link to="/user/info"><img className="img-responsive" alt="demo" src={user.profilePhoto} /></Link>
                    <div className="user-info">
                        <h4>{user.name}</h4>
                        <p>{user.subname}</p>
                    </div>
                    <div className="row">
                        <div className="col-xs-3 tweets-tag">
                            <h5>
                                <p>TWEETS</p>
                                <a href="/">1,545</a>
                            </h5>
                        </div>
                        <div className="col-xs-4 following-tag">
                            <Link to="/user/following" >
                                <h5>
                                    <p>FOLLOWING</p>
                                    <a href="/">{follow.followingNum}</a>
                                </h5>
                            </Link>
                        </div>
                        <div className="col-xs-5 followers-tag">
                            <Link to="/user/followers" >
                                <h5>
                                    <p>FOLLOWERS</p>
                                    <a href="/">{follow.followerNum}</a>
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
    console.log(state)
    return {
        user: state.userReducer,
        follow: state.followReducer
    }
}
export default connect(mapStateToProps)(UserInfo);