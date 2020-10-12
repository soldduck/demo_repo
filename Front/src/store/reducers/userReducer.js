import { initialState } from "../initialState";
import * as types from "../actions/userActions";

export default function userReducer(state = initialState.user, action) {
    
    switch (action.type) {

        case types.SET_USER: {
            let user = state;
            user.Name = action.value.Name;
            user.Surname = action.value.Surname;
            user.Patronymic = action.value.Patronymic;
            user.ID = action.value.ID;
            user.Status = action.value.Status;
            user.Error = action.value.userError;
            console.log(user);
            return user;
        }

        case types.DELETE_USER : {
            let user = initialState.user;
            return user;
        }

        default: 
            return state;
    }
}