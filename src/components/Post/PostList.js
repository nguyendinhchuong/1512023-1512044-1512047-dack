import React from 'react';
import {connect} from 'react-redux'
import PostItem from './PostItem'
const PostList = ({tweets, user}) => {
    return (
        <div>
            <div className="panel-body">
                {
                    tweets.reverse().map((tweet, index)=><PostItem user={user} tweet={tweet} key={index}/>)
                }                           
            </div>
        </div>
    );
};

const mapStateToProps = (state)=>{
    return{
        user: state.userReducer,
        tweets: state.tweetReducer.tweets
    }
}

export default connect(mapStateToProps)(PostList);