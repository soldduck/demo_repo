import * as types from '../actions/userBooksActions';
import { initialState } from '../initialState';

export default function userBooksReducer(state = initialState.usersBooks, action) {
    switch(action.type) {
        case types.UPDATE_PREORDETED_BOOKS: {
            let books = state;
            books.usersPreorderedBooks = action.value;
            return books;
        }

        case types.UPDATE_ORDETED_BOOKS: {
            let books = state;
            books.usersOrderedBooks = action.value;
            return books;
        }

        case types.UPDATE_GAINED_BOOKS: {
            let books = state;
            books.usersGainedBooks = action.value;
            return books;
        }

        default:
            return state;
    }
}