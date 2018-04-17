export const LOAD_STORED_STATE = 'LOAD_STORED_STATE';

export const POST_REQ = 'POST_REQ';
export const postReq = (to, body) => {
    return {
        type: POST_REQ,
        to,
        body,
    }
};

/*Thunk SIGNUP*/
export const signup = (username, password, email, firstname, lastname, pets, kids) => dispatch => {
    let reqBody = {
        username,
        password,
        firstname,
        lastname,
        email,
        pets,
        kids,
    };
    dispatch(postReq('/signup', reqBody));

    return fetch('/signup', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        if(data.response !== 'user added!'){
            dispatch(signupFailed(data.response))
        }
        else{
            localStorage.setItem('userToken', data.token);
            dispatch(signupSuccess(data.data))
        }

    }).catch(err => {
        dispatch(signupFailed(err))
    })
};

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = data => {
    return {
        type: SIGNUP_SUCCESS,
        data,
    }
};

export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const signupFailed = error => {
    return {
        type: SIGNUP_FAILED,
        error,
    }
};

/*Thunk LOGIN*/
export const login = (username, password) => dispatch => {
    let reqBody = {
        username,
        password
    };
    dispatch(postReq('/validate', reqBody));

    return fetch('/validate', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        if(data.response !== 'Logged In!'){
            dispatch(loginFailed(data.response))
        }
        else{
            localStorage.setItem('userToken', data.token);
            dispatch(loginSuccess(data.userData))
        }

    }).catch(err => {
        dispatch(loginFailed(err))
    })
};

//todo pass back user and plant data
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (userData) => {
    return {
        type: LOGIN_SUCCESS,
        userData,
    }
};

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const loginFailed = error => {
    return {
        type: LOGIN_FAILED,
        error,
    }
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => {
    localStorage.removeItem('userToken');
  return{
      type: LOGOUT_USER,
  }
};




