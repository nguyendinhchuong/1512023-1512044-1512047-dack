import React from 'react';
import { connect } from 'react-redux'
import FollowCard from '../FollowCard/FollowCar'
const Following = ({follow}) => {
    return (
        <div>
            <div className="panel panel-default panel-custom user-info">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Followings
            </h3>
                </div>
                <div className="panel-body">
                    <div className="media">
                        <div class="row">
                            <div class="col-xs-12 follow">
                                {
                                    follow.map((obj) => <FollowCard followers={obj} />)
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
        follow: state.followReducer.followings
    }
}
export default connect(mapStateToProps)(Following);