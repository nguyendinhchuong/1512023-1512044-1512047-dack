export default function reducer(
    state = {
        profilePhoto:'',
        name:'',
        subname:'',
        first_name:'Monkey',
        last_name:'King',
        Dob:'',
        phoneNumber:'',
        address:''
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
            case "UPDATE_PROFILE_INFO_FULFILLED":{
                return{
                    ...state,
                    //profilePhoto:action.payload.profilePhoto,
                    first_name:action.payload.first_name,
                    last_name:action.payload.last_name,
                    //Dob:action.payload.Dob,
                    phoneNumber:action.payload.phoneNumber,
                    address:action.payload.address
                }
            }
            default:{
                return state;
            }
        }
}