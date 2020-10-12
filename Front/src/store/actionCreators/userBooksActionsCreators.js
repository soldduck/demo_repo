import * as actionTypes from '../actions/userBooksActions';

export function updatePreorderedBooks(books) {
    return {
        type: actionTypes.UPDATE_PREORDETED_BOOKS,
        value: books
    };
}

export function updateOrderedBooks(books) {
    return {
        type: actionTypes.UPDATE_ORDETED_BOOKS,
        value: books
    };
}

export function updateGainedBooks(books) {
    return {
        type: actionTypes.UPDATE_GAINED_BOOKS,
        value: books
    };
}