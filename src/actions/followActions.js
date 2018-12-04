export function fetchFollowerNumber(){
    return {
        type: "FETCH_FOLLOWER_NUMBER",
        payload
    }
}

export function fetchFollowingNumber(){
    return {
        type: "FETCH_FOLLOWING_NUMBER",
        payload
    }
}
export function fetchFollowerList(){
    return{
        type: "FETCH_FOLLOWER_LIST",
        payload:{
            profilePhoto,
            name
        }
    }
}
export function fetchFollowingList(){
    return{
        type: "FETCH_FOLLOWING_LIST",
        payload:{
            profilePhoto,
            name
        }
    }
}