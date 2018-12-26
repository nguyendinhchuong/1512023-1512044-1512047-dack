export function updateProfileInfo(data) {
    return {
        type: "UPDATE_PROFILE_INFO_FULFILLED",
        payload: {
            profilePhoto: data.profilePhoto,
            first_name: data.first_name,
            last_name: data.last_name,
            DoB: data.DoB,
            phoneNumber: data.phoneNumber,
            address: data.address
        }
    }
}

export function fetchUserData(data) {
    return {
        type: "FETCH_USER_FULFILLED",
        payload: {
            account: data.account,
            sequence: data.sequence,
            amount: data.amount,
            name: data.name,
            exchange: [...data.exchange]
        }
    }
}
