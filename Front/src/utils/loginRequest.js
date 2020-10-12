import React from 'react';
import * as ApiConstants from './apiConstants';

const login = async (surname, id) => {
    var request = {
        Surname: surname,
        PassId: id
    }

    let user;    

    await fetch((ApiConstants.BASE_API_URL + '/Account/Login'), {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        user = {
            token : data.token,
            Name : data.userName,
            Surname : data.userSurname,
            Patronymic : data.userPatronymic,
            Status : data.userStatus,
            userError : data.userError,
            ID : id
        }
    })
    .catch(err => console.log(err));

    return user;
}

export default login;