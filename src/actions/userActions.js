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

export function fetchUser(name, subname, profilePhoto) {
    return {
        type: "FETCH_USER_FULFILLED",
        payload: {
            profilePhoto: profilePhoto,
            name: name,
            subname: subname
        }
    }
}

