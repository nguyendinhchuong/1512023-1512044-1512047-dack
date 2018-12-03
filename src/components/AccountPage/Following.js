import React from 'react';
import FollowCard from '../FollowCard/FollowCar'
const Following = () => {
    return (
        <div>
            <div className="panel panel-default panel-custom user-info">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Followers
            </h3>
                </div>
                <div className="panel-body">
                    <div className="media">
                        <div class="row">
                            <div class="col-xs-12 follow">
                               <FollowCard></FollowCard>
                               <FollowCard></FollowCard>
                               <FollowCard></FollowCard>
                               <FollowCard></FollowCard>                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
};

export default Following;