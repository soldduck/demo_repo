import { initialState } from "../initialState";
import * as types from "../actions/searchActions";

export default function searchReducer(state = initialState.searchedBooks, action) {
    
    switch(action.type) {
        case types.UPDATE_SEARCHED_BOOKS: {
            return action.value;
        }
        default:
            return state;
    }
}