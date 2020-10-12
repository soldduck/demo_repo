import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import store from '../store/store';
import * as actions from '../store/actionCreators/userBooksActionsCreators';

import getUserBooks from '../utils/getUserBooks'


const useStyles = makeStyles(theme => ({
    fullHeight: {
        height: "100%",
    },
    }));

const OrderedBooksView = (props) => {

    const classes = useStyles();

    const [stateBooks, setBooks] = useState(props.books);

    //использую это чтобы изменить и свой state компонента, и state redux'a. Только redux работает странно - не вызывается render при изменении состояния. 
    const updateBooksInStoreAndState = (books) => {
        setBooks(books);
        props.setOrderedBooks(books);
    }

    let token = store.getState().token;

    useEffect(() => {
        const fetchData = async () => {
            const books = await getUserBooks(2, token);
            updateBooksInStoreAndState(books);
        }

        fetchData();
    }, []);

    return (
        <Grid
            container
            direction="row"
            spacing={2}
            justify="flex-start"
            alignItems="stretch"   
        >
            {(stateBooks && stateBooks.length > 0) ? stateBooks.map((book, index) => {
                return (<Grid item sm={12} md={6}>
                    <Card className={classes.fullHeight}>
                        <CardContent>
                            <Typography paragraph variant="body2">Автор: {book.author}</Typography>
                            <Typography paragraph variant="body2">Название: {book.biblio}</Typography>
                            <Typography paragraph variant="body2">Отдел: {book.bookPointDB}</Typography>
                            <Typography paragraph variant="body2">Дата заказа: {book.dateTake}</Typography>
                            <Typography paragraph variant="body2">Статус: {book.statusOrder}</Typography>
                        </CardContent>
                    </Card>
                </Grid>)
            }) : 
            (<Grid item>
                <Typography paragraph align='center' variant="body1">У вас нет заказанных книг.</Typography>
            </Grid>)}
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        books: state.usersBooks.usersOrderedBooks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderedBooks: (books) => dispatch(actions.updateOrderedBooks(books))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedBooksView);