export default function reducer(
    state = {
        account: null,
        sequence: 0,
        amount: 0,
        name: null,
        exchange: []
    }, action) {
    switch (action.type) {
        case "FETCH_USER_FULFILLED": {
            return {
                ...state,
                account: action.payload.account,
                sequence: action.payload.sequence,
                amount: action.payload.amount,
                name: action.payload.name,
                exchange: [...action.payload.exchange]
            }
        }
        case "UPDATE_PROFILE_INFO_FULFILLED": {
            return {
                ...state,
                //profilePhoto:action.payload.profilePhoto,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                //Dob:action.payload.Dob,
                phoneNumber: action.payload.phoneNumber,
                address: action.payload.address
            }
        }
        case "POST_TWEET":{
            return{
                ...state,
                
                
            }
        }
        default: {
            return state;
        }
    }
}