import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Typography, Card, Button, CardContent, Grid} from '@material-ui/core';
import store from '../store/store';
import preOrder from '../utils/preorderRequest';

import showAlertMessage from '../utils/showAlertMessage';


const PreorderButton = (props) => {

    const [buttonDisabled, setButtonDisabled] = useState(props.hasDept);
    const [buttonText, setButtonText] = useState("Отобрать");

    const handleClick = async (e) => {
        e.preventDefault();
        let target = e.target;
        let response = await preOrderBook(props.newDocId, props.bookpointId);
        console.log(response);
        if (response.status == "1") {
            setButtonDisabled(true);
            setButtonText("Отобрана");
        } else {
            showAlertMessage("Ошибка", response.errMessage);
        }
    }

    const preOrderBook = async (bookId, bookpointId) => {
        let token = store.getState().token;
        return await preOrder(bookId, bookpointId, token);
    }

    return(
        <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={(e) => handleClick(e)} key={props.newDocId}>
            {buttonText}
        </Button>
    );
}

export default function BookInfoView(props) {

  return (
      <Grid container direction="row" spacing={2}>
        {props.bookData !== null ? 
            props.bookData.map((book) => (
                <Grid item sm={6} md={3} >
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    {book.bookpoint}
                                </Grid>
                                <Grid item>
                                    Всего: {book.totalCount}
                                </Grid>
                                <Grid item>
                                    В наличии: {book.issuedCount}
                                </Grid>
                                <Grid item>
                                    {(book.operation == "ОТОБРАТЬ") ? <PreorderButton newDocId={book.newDocId} bookpointId={book.bookpointId} hasDept={props.hasDept}/> : book.operation}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))
            :
            <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item>
                    <Typography align="center" variant="body" color="error">Для заказа книги необходима авторизация</Typography>
                </Grid>
            </Grid>
        }
      </Grid>
  );
}
