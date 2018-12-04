export default function reducer(
    state = {
        followerNum: null,
        followingNum: null,
        followers:[],
        followings:[]
    }, action) {
    switch (action.type) {
        case "FETCH_FOLLOWER_NUMBER": {
            return {
                ...state,
                followerNum: action.payload
            }
        }
        case "FETCH_FOLLOWING_NUMBER": {
            return {
                ...state,
                followingNum: action.payload
            }
        }
        case "FETCH_FOLLOWER_LIST":{
            return{
                ...state,
                followers:action.payload
            }
        }
        case "FETCH_FOLLOWING_LIST":{
            return{
                ...state,
                followings:action.payload
            }
        }
        default: {
            return state;
        }
    }
}