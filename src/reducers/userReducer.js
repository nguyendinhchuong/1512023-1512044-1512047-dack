export default function reducer(
    state = {
        account: null,
        sequence: 0,
        amount: 0,
        name: null,
        exchange: [],
        photoUser: null,
        transactions: [],
        address:null
    }, action) {
    switch (action.type) {
        case "FETCH_USER_FULFILLED": {
            return {
                ...state,
                account: action.payload.account,
                sequence: action.payload.sequence,
                amount: action.payload.amount,
                name: action.payload.name,
                exchange: [...action.payload.exchange],
                transactions: [...action.payload.transactions],
                photoUser: action.payload.photoUser
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

        case "GET_USER_CREATION":{
            return Object.assign({}, state, {
                account: action.payload.account,
                address: action.payload.address
            })

        }
        default: {
            return state;
        }
    }
}
