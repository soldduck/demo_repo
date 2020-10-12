import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Divider, Grid, Typography } from '@material-ui/core';
import BookInfoView from './BookInfoView';

function BookView(props) {
    return(
        <Card>
            <CardContent>
                <Typography variant='subtitle1' color="subtitle2">
                    {props.header}
                </Typography>
                <BookInfoView bookData={props.bookData} hasDept={props.hasDept}/>
            </CardContent>
        </Card>
    )
}

export default BookView;

