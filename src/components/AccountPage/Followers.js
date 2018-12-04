import React from 'react';
import { connect } from 'react-redux'
import FollowCard from '../FollowCard/FollowCar'
const Followers = ({follow}) => {
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
                                {
                                    follow.map((obj)=><FollowCard followers={obj}/>)
                                }
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

const mapStateToProps = (state) => {
    return {
        follow: state.followReducer.followers
    }
}
export default connect(mapStateToProps)(Followers);