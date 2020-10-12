import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import SnackBar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

const AlertMessage = (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(props.alert.showed);

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    console.log("AlertMessage: ");
    console.log(props);
    return (
        <SnackBar open={props.alert.showed} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {props.alert.message}
            </Alert>
        </SnackBar>
    );
}

export default AlertMessage;