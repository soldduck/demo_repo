import * as actionTypes from '../actions/tokenActions';

export function setToken(token) {
    console.log("token action");
    return {
        type: actionTypes.SET_TOKEN,
        value: token
    };
}

export function deleteToken(token) {
    return {
        type: actionTypes.DELETE_TOKEN,
        value: token
    };
}