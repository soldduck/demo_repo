import React from 'react';

import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import Welcome from '../components/Welcome';

const LoginPage = (props) => {

    return (
        <div>
            {!props.token ? <LoginForm/> : <Welcome user={props.user}/>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    };
}

export default connect(mapStateToProps)(LoginPage);