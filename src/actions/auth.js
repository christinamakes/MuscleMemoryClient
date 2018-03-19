import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';


// set auth token in state
export const SET_AUTH = 'SET_AUTH';
export const setAuth = authToken => ({
  type: SET_AUTH,
  authToken
});

// clear auth token from state
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

// define loading state while making request to server 
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

// define current user in state upon success
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

// record error upon auth failure
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const authFailure = error => ({
  type: AUTH_FAILURE,
  error
})



// stores auth token in state & local storage
const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuth(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken); // from local storage
}

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
    // fetch from server
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    // normalize errors returned from server
    .then(res => normalizeResponseErrors(res))
    // return server request
    .then(res => res.json())
    // store jwt returned from server
    .then(({authToken}) => storeAuthInfo(authToken, dispatch))
    // catch other errors from failed request
    .catch(err => {
      // if error code is 401 the username or password is incorrect otherwise something went wrong on the server side
      const message = err.code === 401 ? 'Incorrect username or password' : 'Something went wrong, please try again'
      // dispatch failure action
      dispatch(authFailure(err))
      // reject promise from fetch
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    })
  );
}

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(({authToken}) => storeAuthInfo(authToken, dispatch))
  .catch(err => {
    dispatch(authFailure(err))
    dispatch(clearAuth())
    clearAuthToken(authToken);
  })
}

