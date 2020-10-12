import * as actionTypes from "../actions/userActions";

export function setUser(user) {
    return {
        type: actionTypes.SET_USER,
        value: user
    };
}

export function deleteUser(user) {
    return {
        type: actionTypes.DELETE_USER,
        value: user
    };
}