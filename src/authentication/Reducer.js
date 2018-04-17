import { LOAD_STORED_STATE, POST_REQ, SIGNUP_SUCCESS, SIGNUP_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_USER } from "./Actions";

const initState = {
    isRegistered: false,
    isFetching: false,
    isLoggedIn: false,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    pets: false,
    kids: false,
    error: '',
};

export default function(state = initState, action) {
    switch(action.type) {
        case LOAD_STORED_STATE:
            return {...action.storedState.auth};
        case POST_REQ:
            return {...state, isFetching: true};
        case SIGNUP_SUCCESS:
            return {...action.data, isFetching: false, isRegistered:true, error: ''};
        case SIGNUP_FAILED:
            return {...initState, error:JSON.stringify(action.error)};
        case LOGIN_SUCCESS:
            return {...action.userData, isLoggedIn: true, isFetching:false, error: ''};
        case LOGIN_FAILED:
            return {...initState, error:action.error};
        case LOGOUT_USER:
            return{...initState};
        default:
            return state;
    }
}



