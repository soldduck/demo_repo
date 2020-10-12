import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as userActions from '../store/actionCreators/userActionsCreators';
import * as tokenActions from '../store/actionCreators/tokenActionsCreators';
import store from '../store/store';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardContent } from '@material-ui/core';

import login from '../utils/loginRequest';
import showAlertMessage from '../utils/showAlertMessage';

const useStyles = makeStyles(theme => ({
loginFormBlockWrapper : {
      height: '20em',
      position: 'relative' },
 loginFormBlock : {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }}
  ));

function LoginForm () {

    const defaultState = {
        surnameError: false,
        surnameErrorText: "",
        idError: false,
        idErrorText: "",
        userSurname: "",
        userID: ""
    }

    const [formState, setFormState] = useState(defaultState);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        var data = await login(formState.userSurname, formState.userID);
        if (data.token === null) {
            showAlertMessage("Ошибка!", data.userError);
        } else {
            store.dispatch(userActions.setUser(data));
            store.dispatch(tokenActions.setToken(data.token));
        }
        setLoading(false);
    }

    const handleChangeSurname = (e) => {
        e.preventDefault();
        let currentState = formState;
        currentState.userSurname = e.target.value;
        setFormState(currentState);
    }

    const handleChangeID = (e) => {
        e.preventDefault();
        let currentState = formState;
        currentState.userID = e.target.value;
        setFormState(currentState);
    }


    const classes = useStyles();
    return(
        <Container style={{display: 'flex', verticalAlign: 'center', justifyContent: 'center',  alignItems: 'center'}}>
            <Card style={{display: 'inline-flex'}}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item xs={12} md={"auto"} >
                                <AccountCircle fontSize="large"/> 
                            </Grid>
                            <Grid item xs={12} md={"auto"}>
                                <TextField 
                                    onChange={handleChangeSurname} 
                                    id="userSurnameInput" 
                                    label="Фамилия" 
                                    defaultValue={formState.userSurname}
                                    error={formState.surnameError} 
                                    helperText={formState.surnameErrorText}/>
                            </Grid>
                            <Grid item xs={12} md={"auto"}>
                                <TextField 
                                    onChange={handleChangeID}  
                                    id="userIDInput" 
                                    label="Номер пропуска" 
                                    defaultValue={formState.userID}
                                    type="text" 
                                    pattern="[0-9]"/>
                            </Grid>
                            <Grid item xs={12} md={"auto"}>
                                <Button type='submit' disabled={loading} style={{verticalAlign: 'bottom', marginLeft: '2px'}} variant="outlined" color="primary">
                                    {loading ? <CircularProgress size={24} /> : "Войти"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default connect(null, userActions)(LoginForm);