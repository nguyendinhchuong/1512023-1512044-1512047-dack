export default function reducer(
    state = {
        tweets: [],
        heading: '',
        tweet: '',
        like: 0,
        comment: [],
        share: 0,
        time:null
    }, action) {
    switch (action.type) {
        case "FETCH_TWEETS": {
            return {
                ...state,
                tweets: action.payload.tweets
            }
        }
        case "FETCH_TWEET_FULFILLED": {
            return {
                ...state,
                heading: action.payload.heading,
                tweet: action.payload.tweet,
                like: action.payload.like,
                comment: action.payload.comment,
                share: action.payload.share
            }
        }
        case "LIKE_TWEET": {
            return {
                ...state,
                like: state.like + 1
            }
        }
        case "COMMENT_TWEET": {
            return {
                ...state,
                comment: state.comment.concat(action.payload)
            }
        }
        case "POST_TWEET":{
            let tweet = action.payload;
            return{
                ...state,
                tweets: state.tweets.concat(tweet)
            }
        }

        default: {
            return state;
        }
    }
}