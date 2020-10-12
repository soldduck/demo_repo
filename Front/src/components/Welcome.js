import React from 'react';

import { Container, Typography } from '@material-ui/core';

import { connect } from 'react-redux';

const Welcome = (props) => {
    return (
        <Container>
            <Typography variant='h4' paragraph align='center'>Добро пожаловать!</Typography>
            <Typography variant='h6' paragraph align='center'>Вы вошли как {props.user.Surname} {props.user.Name}.</Typography>
        </Container>
    );
} 


export default Welcome;