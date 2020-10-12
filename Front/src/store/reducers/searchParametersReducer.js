import { initialState } from "../initialState";
import * as types from "../actions/searchActions";

export default function searchParametersReducer(state = initialState.searchParameters, action) {
    switch(action.type) {
        case types.UPDATE_SEARCH_PARAMETER: {
            let params = state;
            params[action.value.name] = action.value.value;
            return params;
        }

        default:
            return state;
    }
}