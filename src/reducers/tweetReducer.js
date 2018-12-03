export default function reducer(
    state = {
        heading: '',
        tweet: '',
        like: 0,
        comment: [],
        share: 0
    }, action) {
    switch (action.type) {
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
        case "LIKE_TWEET":{
            return  {
                ...state,
                like: state.like+1                
            }
        }
        case "COMMENT_TWEET":{
            return  {
                ...state,
                comment:state.comment.concat(action.payload)        
            }
        }
        default: {
            return state;
        }
    }
}