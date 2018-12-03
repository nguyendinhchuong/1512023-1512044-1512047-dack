export function fetchTweets() {
    return {
        type: "FETCH_TWEET_FULFILLED",
        payload: {
            tweets,
            heading,
            like,
            comment,
            share
        }
    }
}
export function likeTweets() {
    return {
        type: "LIKE_TWEET"        
    }
}

export function commentTweets() {
    return {
        type: "COMMENT_TWEET",
        payload:{
            cmt
        }       
    }
}

