import React from 'react';
import { Link } from "react-router-dom"

const UserInfo = () => {
    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-body">
                    <Link to="/user/info"><img className="img-responsive" alt="demo" src="http://placehold.it/800x500" /></Link>
                    <div className="user-info">
                        <h4>Ngoc Bao</h4>
                        <p>@dieu_bao</p>
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
                                    <a href="/">251</a>
                                </h5>
                            </Link>
                        </div>
                        <div className="col-xs-5 followers-tag">
                            <Link to="/user/followers" >
                                <h5>
                                    <p>FOLLOWERS</p>
                                    <a href="/">153</a>
                                </h5>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;