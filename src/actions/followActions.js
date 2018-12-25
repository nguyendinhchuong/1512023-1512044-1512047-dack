export function fetchFollowerNumber(){
    return {
        type: "FETCH_FOLLOWER_NUMBER",
        payload:null
    }
}

export function fetchFollowingNumber(){
    return {
        type: "FETCH_FOLLOWING_NUMBER",
        payload:null
    }
}
export function fetchFollowerList(){
    return{
        type: "FETCH_FOLLOWER_LIST",
        payload:{
            profilePhoto:'',
            name:''
        }
    }
}
export function fetchFollowingList(){
    return{
        type: "FETCH_FOLLOWING_LIST",
        payload:{
            profilePhoto:'',
            name:''
        }
    }
}