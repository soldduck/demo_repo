import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import searchParametersReducer from './searchParametersReducer';
import searchReducer from './searchReducer';
import userBooksReducer from './userBooksReducer';
import * as actionTypes from '../actions/defaultStateActions';
import initialState from '../store';

export default (state = initialState, action) => {
    if (action.type === actionTypes.SET_DEFAULT_STATE) {
        return initialState;
    }

    return appReducer(state, action);
}

const appReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    searchParameters: searchParametersReducer,
    searchedBooks: searchReducer,
    usersBooks: userBooksReducer,
});