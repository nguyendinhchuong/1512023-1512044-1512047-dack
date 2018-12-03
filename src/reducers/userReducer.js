export default function reducer(
    state = {
        profilePhoto:'',
        name:'',
        subname:''
    }, action) {
        switch(action.type){
            case "FETCH_USER_FULFILLED":{
                return{
                    ...state,
                    profilePhoto:action.payload.profilePhoto,
                    name:action.payload.name,
                    subname:action.payload.subname
                }
            }
            default:{
                return state;
            }
        }
}