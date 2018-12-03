import React from 'react';
import { Link } from "react-router-dom"

import FollowBoxCard from '../FollowCard/FollowBoxCard'
const FollowBox = () => {
    return (
        <div>
            <div className="panel panel-default panel-custom .follow-panel">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Who to follow
                    </h3>
                    <Link to="/">Refresh</Link>
                    <Link to="/">View all</Link>
                </div>
                <div className="panel-body">
                    <FollowBoxCard></FollowBoxCard>
                    <FollowBoxCard></FollowBoxCard>
                    <FollowBoxCard></FollowBoxCard>
                </div>
                <div className="panel-footer">
                    <Link to="/">
                        <span className="glyphicon glyphicon-user"></span> Find people you know
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FollowBox;