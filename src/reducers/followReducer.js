export default function reducer(
    state = {
        followers:[],
        followings:[]
    }, action) {
    switch (action.type) {
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