import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from '../store/actionCreators/userBooksActionsCreators';
import store from '../store/store';

import getUserBooks from '../utils/getUserBooks'

import order from '../utils/orderRequest';
import removePreOrder from '../utils/removePreorderRequest';


//107423



const useStyles = makeStyles(theme => ({
    fullHeight: {
        height: "100%",
    },
    }));

const PreOrderedBooksView = (props) => {

    const classes = useStyles();

    const [stateBooks, setBooks] = useState(props.books);

    //использую это чтобы изменить и свой state компонента, и state redux'a. Только redux работает странно - не вызывается render при изменении состояния. 
    const updateBooksInStoreAndState = (books) => {
        setBooks(books);
        props.setPreorderedBooks(books);
    }

    let token = store.getState().token;

    useEffect(() => {
        const fetchData = async () => {
            const books = await getUserBooks(3, token);
            updateBooksInStoreAndState(books);
        }

        fetchData();
    }, []);

    const StyledCard = withStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        }
    })(Card);

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
                    <StyledCard>
                        <CardContent>
                            <Typography paragraph variant="body2">Автор: {book.author}</Typography>
                            <Typography paragraph variant="body2">Название: {book.biblio}</Typography>
                            <Typography paragraph variant="body2">Отдел: {book.bookPointDB}</Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Grid className={classes.fullHeight} spacing={1} container direction='row' justify='flex-end' alignItems='flex-end' alignContent="center">
                                <Grid item>
                                    <OrderButton bookId={book.bookId}/>
                                </Grid>
                                <Grid item>
                                    <RemovePreorderButton bookId={book.bookId}/>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </StyledCard>
                </Grid>)
            }) : 
            (<Grid item>
                <Typography paragraph align='center' variant="body1">У вас нет отобранных книг. Чтобы отобрать книги воспользуйтесь поиском.</Typography>
            </Grid>)}
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        books: state.usersBooks.usersPreorderedBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPreorderedBooks: (books) => dispatch(actions.updatePreorderedBooks(books))
    }
}

const OrderButton = (props) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Заказать");

    const handleClick = async (e) => {
        e.preventDefault();
        let target = e.target;
        let response = await orderBook(props.bookId);
        console.log(response);
        if (response.status == "1") {
            setButtonDisabled(true);
            setButtonText("Заказана");
        }
    }

    const orderBook = async (bookId) => {
        let token = store.getState().token;
        return await order(bookId, token);
    }

    return(
        <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={(e) => handleClick(e)}>
            {buttonText}
        </Button>
    );
}

const RemovePreorderButton = (props) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Удалить");

    const handleClick = async (e) => {
        e.preventDefault();
        let target = e.target;
        let response = await removePreorderBook(props.bookId);
        console.log(response);
        if (response.status == "1") {
            setButtonDisabled(true);
            setButtonText("Удалена");
        }
    }

    const removePreorderBook = async (bookId) => {
        let token = store.getState().token;
        return await removePreOrder(bookId, token);
    }

    return(
        <Button variant="contained" color="secondary" disabled={buttonDisabled} onClick={(e) => handleClick(e)} title="Удалить">
            {buttonText}
        </Button>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PreOrderedBooksView);