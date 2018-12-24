import React from 'react';
import {connect} from 'react-redux'
import PostItem from './PostItem'
const PostList = ({tweets}) => {
    return (
        <div>
            <div className="panel-body">
                {
                    tweets.map((tweet, index)=><PostItem tweet={tweet} key={index}/>)
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