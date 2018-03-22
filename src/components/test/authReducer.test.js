
import {authSuccess, setAuth, clearAuth, authRequest, authFailure} from '../../actions/auth';
import {completeWorkoutSuccess} from '../../actions/workout';
import {authReducer} from '../../reducers/authReducer';

describe('Auth reducer', () => {
  it('should set initial state', () => {
    const state = authReducer(undefined, {type: '@@TEST'});
    expect(state).toEqual({
      currentUser: null,
      authToken: null,
      loading: false,
      error: null
      });
  })

  it('should return the state when an unknown action is passed', () => {
    let currentState = {};
    const state = authReducer(currentState, {type: '@@UNKNOWN'});
    expect(state).toBe(currentState);
  })
})

describe('Success', () => {
  const user = {username: 'username', password: 'password'};
  const userWorkout = {username: 'username', password: 'password', workout: 'workout'};
  
  it('Should set user as current user', () => {
    let state;
    state = authReducer(state, authSuccess(user))
    expect(state).toEqual({
      authToken: null, 
      currentUser: {"password": "password", "username": "username"}, 
      error: null, 
      loading: false
    });
  })

  it('Should set current workout on current user', () => {
    let state;
    state = authReducer(state, completeWorkoutSuccess(userWorkout))
    expect(state).toEqual({
      authToken: null, 
      currentUser: {username: 'username', password: 'password', workout: 'workout'}, 
      error: null, 
      loading: false
    });
  })
})

describe('authError', () => {
  const error = 'oops';
  it('should set state to error', () => {
    let state;
    state = authReducer(state, authFailure(error))
    expect(state).toEqual({
      authToken: null, 
      currentUser: null, 
      error, 
      loading: false
    })
  })
})

describe('authRequest', () => {
  it('should set state to loading', () => {
    let state;
    state = authReducer(state, authRequest())
    expect(state).toEqual({
      authToken: null, 
      currentUser: null, 
      error: null, 
      loading: true
    })
  })
})

describe('Auth Token', () => {
  const authToken = 'passingToken';
  it('should set the authToken', () => {
    let state;
    state = authReducer(state, setAuth(authToken))
    expect(state).toEqual({
      authToken,
      currentUser: null, 
      error: null, 
      loading: false
    })
  })

  it('should clear the authToken', () => {
    let state;
    state = authReducer(state, clearAuth(authToken))
    expect(state).toEqual({
      authToken: null,
      currentUser: null, 
      error: null, 
      loading: false
    })
  })
})