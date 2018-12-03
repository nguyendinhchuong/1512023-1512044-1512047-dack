import React, { Component } from "react";

import Navbar from '../../components/Navbar/Navbar'
import Avatar from '../../components/Avatar/Avatar'
import Follower from '../../components/Follower/Follower'
import Profile from '../../components/Profile/Profile'
class AccountPage extends Component {
    render() {
      return (
        <div className="body">
        <Navbar></Navbar>
        <Avatar></Avatar>
        <div className="container">
          <div className="row">                     
            <Profile></Profile>           
            <Follower></Follower>
          </div>
        </div>    
      </div>
      );
    }
  }
  
  export default AccountPage;