import React from 'react';
import PostItem from './PostItem'
const PostList = () => {
    return (
        <div>
            <div className="panel-body">
                <PostItem></PostItem>
                <PostItem></PostItem>
                <PostItem></PostItem>                            
            </div>
        </div>
    );
};

export default PostList;