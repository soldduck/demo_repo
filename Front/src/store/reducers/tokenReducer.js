import * as types from "../actions/tokenActions";

export default function tokenReducer(state = "", action) {
    switch (action.type) {
        case types.SET_TOKEN: {
            let token = state;
            token = action.value;
            return token;
        }

        case types.DELETE_TOKEN: {
            return "";
        }

        default: 
            return state;
    }
}