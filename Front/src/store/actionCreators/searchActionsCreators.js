import * as actionTypes from "../actions/searchActions";

export function updateSearchParameter(parameter) {
    return {
        type: actionTypes.UPDATE_SEARCH_PARAMETER,
        value: parameter
    }
}

export function updateSearchedBooks(books) {
    return {
        type: actionTypes.UPDATE_SEARCHED_BOOKS,
        value: books
    }
}