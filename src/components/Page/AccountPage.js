import React from 'react';
import UserInfo from '../Layout/UserInfo';
import Trends from '../Layout/Trends';
import FollowBox from '../HomePage/FollowBox';
import EditUser from '../AccountPage/EditUser';

const AccountPage = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <UserInfo />
                        <Trends />
                    </div>
                    <div className="col-sm-6">
                        <EditUser />
                    </div>
                    <div className="col-sm-3">
                        <FollowBox />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;