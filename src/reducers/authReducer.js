import {AUTH_SUCCESS, SET_AUTH, CLEAR_AUTH, AUTH_REQUEST, AUTH_FAILURE} from '../actions/auth';
import {clearAuthToken} from '../local-storage'
import {COMPLETE_WORKOUT_SUCCESS} from '../actions/workout'


const initialState = {
  currentUser: null,
  authToken: null,
  loading: false,
  error: null
};

function authReducer(state = initialState, action) {
  switch(action.type) {
    case COMPLETE_WORKOUT_SUCCESS: 
    return {
      ...state,
      currentUser: action.user
    }
    case AUTH_SUCCESS: 
      return {
        ...state,
        currentUser: action.currentUser
      }
    case SET_AUTH: 
      return {
        ...state,
        authToken: action.authToken
      }
    case CLEAR_AUTH: 
      clearAuthToken()
      return {
        ...state,
        authToken: null,
        currentUser: null
      }
    case AUTH_REQUEST: 
        return {
          ...state,
          loading: true,
          error: null
      }
    case AUTH_FAILURE: 
        return {
          ...state,
          loading: false,
          error: action.error
      }
    default: return state;
  }
}

export default authReducer;