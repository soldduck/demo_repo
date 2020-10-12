import React from 'react';
import ReactDOM from 'react-dom';

import AlertDialog from '../components/AlertDialog'

const showAlertMessage = (header, message) => {
    ReactDOM.render(
        <AlertDialog header={header} message={message} close={destroyAlertMessage}/>,
        document.getElementById('alertMessage')
    );
}

const destroyAlertMessage = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('alertMessage'));
}

export default showAlertMessage;