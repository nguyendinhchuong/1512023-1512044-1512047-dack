import React from 'react';
import {connect} from 'react-redux'
import PostItem from './PostItem'
const PostList = ({tweets}) => {
    return (
        <div>
            <div className="panel-body">
                {
                    tweets.map((tweet)=><PostItem tweet={tweet}/>)
                }                           
            </div>
        </div>
    );
};

const mapStateToProps = (state)=>{
    return{
        tweets: state.tweetReducer.tweets
    }
}

export default connect(mapStateToProps)(PostList);