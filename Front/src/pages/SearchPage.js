import React from 'react';
import Container from '@material-ui/core/Container';
import SearchForm from '../components/SearchForm';
import SearchedBooksView from '../components/SearchedBooksView';
import BookView from '../components/BookView';
import BookInfoView from '../components/BookInfoView';
import { Search } from '@material-ui/icons';

export default function SearchPage(props) {
    return(
        <Container styles={{marhinTop: '40px'}}>
            <SearchForm />
            <SearchedBooksView />
        </Container>
    );
}