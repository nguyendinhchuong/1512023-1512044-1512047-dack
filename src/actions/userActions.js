export function setProfileInfo(data) {
    return {
        type: "SET_PROFILE_INFO_FULFILLED",
        payload: {
            profilePicture: data.profilePicture,
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

