import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">{props.header}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message}
          </DialogContentText>
        </DialogContent>
          <DialogActions >
            <Button onClick={props.close} color="primary" autoFocus>
                ОК
            </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}