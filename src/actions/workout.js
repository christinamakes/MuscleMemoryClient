// import {SubmissionError} from 'redux-form'

import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils'


// user submit new workout
export const NEW_WORKOUT_SUCCESS = 'NEW_WORKOUT_SUCCESS';
export const newWorkoutSuccess = data => ({
    type: NEW_WORKOUT_SUCCESS,
    data
});

export const NEW_WORKOUT_ERROR = 'NEW_WORKOUT_ERROR';
export const newWorkoutError = error => ({
    type: NEW_WORKOUT_ERROR,
    error
});

export const NEW_WORKOUT_REQUEST = 'NEW_WORKOUT_REQUEST';
export const newWorkoutRequest = error => ({
    type: NEW_WORKOUT_REQUEST,
    error
});

export const newWorkout = (workoutName, exercises) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id

  dispatch(newWorkoutRequest())
  return fetch(`${API_BASE_URL}/workout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      workoutName, 
      exercises,
      userId
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(({data}) => dispatch(newWorkoutSuccess(data)))
  .catch(err => {
    // const {reason, message, location} = err;
    dispatch(newWorkoutError(err));
    }
  );
};


// user log workout
export const COMPLETE_WORKOUT_SUCCESS = 'COMPLETE_WORKOUT_SUCCESS';
export const completeWorkoutSuccess = user => ({
    type: COMPLETE_WORKOUT_SUCCESS,
    user
});

export const COMPLETE_WORKOUT_ERROR = 'COMPLETE_WORKOUT_ERROR';
export const completeWorkoutError = error => ({
    type: COMPLETE_WORKOUT_ERROR,
    error
});
export const COMPLETE_WORKOUT_REQUEST = 'COMPLETE_WORKOUT_REQUEST';
export const completeWorkoutRequest = error => ({
    type: COMPLETE_WORKOUT_REQUEST,
    error
});

export const completeWorkout = (workout) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id

  dispatch(completeWorkoutRequest())
  return fetch(`${API_BASE_URL}/users?userId=${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      recentWorkout: workout, 
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((user) => dispatch(completeWorkoutSuccess(user)))
  .catch(err => {
    // const {reason, message, location} = err;
    dispatch(completeWorkoutError(err));
    }
  );
};


// get user workouts from database
export const GET_WORKOUT_SUCCESS = 'GET_WORKOUT_SUCCESS';
export const getWorkoutSuccess = data => ({
    type: GET_WORKOUT_SUCCESS,
    data
});

export const GET_WORKOUT_ERROR = 'GET_WORKOUT_ERROR';
export const getWorkoutError = error => ({
    type: GET_WORKOUT_ERROR,
    error
});
export const GET_WORKOUT_REQUEST = 'GET_WORKOUT_REQUEST';
export const getWorkoutRequest = error => ({
    type: GET_WORKOUT_REQUEST,
    error
});
export const getWorkouts = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id

  dispatch(getWorkoutRequest())
  return fetch(`${API_BASE_URL}/workout?userId=${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => dispatch(getWorkoutSuccess(data)))
  .catch(err => {
    dispatch(getWorkoutError(err));
  });
}


// get muscles from user workout 

export const GET_MUSCLES_SUCCESS = 'GET_MUSCLES_SUCCESS';
export const getMusclesSuccess = data => ({
    type: GET_MUSCLES_SUCCESS,
    data
});

export const GET_MUSCLES_ERROR = 'GET_MUSCLES_ERROR';
export const getMusclesError = error => ({
    type: GET_MUSCLES_ERROR,
    error
});
export const GET_MUSCLES_REQUEST = 'GET_MUSCLES_REQUEST';
export const getMusclesRequest = error => ({
    type: GET_MUSCLES_REQUEST,
    error
});

export const getMusclesFromWorkout = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id
  const workoutId = getState().auth.currentUser.recentWorkout[0]
  // console.log(workoutId);
  dispatch(getMusclesRequest())
  return fetch(`${API_BASE_URL}/id/muscles?userId=${userId}&workoutId=${workoutId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => dispatch(getMusclesSuccess(data)))
  .catch((err) => {
    dispatch(getMusclesError(err))
  });
}


// get list of exercises from workout id
export const GET_EXERCISES_SUCCESS = 'GET_EXERCISES_SUCCESS';
export const getExercisesSuccess = data => ({
    type: GET_EXERCISES_SUCCESS,
    data
});

export const GET_EXERCISES_ERROR = 'GET_EXERCISES_ERROR';
export const getExercisesError = error => ({
    type: GET_EXERCISES_ERROR,
    error
});
export const GET_EXERCISES_REQUEST = 'GET_EXERCISES_REQUEST';
export const getExercisesRequest = error => ({
    type: GET_EXERCISES_REQUEST,
    error
});

export const getExercisesFromWorkout = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const userId = getState().auth.currentUser.id
  const workoutId = getState().auth.currentUser.recentWorkout

  dispatch(getExercisesRequest())
  return fetch(`${API_BASE_URL}/id/exercises?userId=${userId}&workoutId=${workoutId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => dispatch(getExercisesSuccess(data)))
  .catch((err) => {
    dispatch(getExercisesError(err))
  });
}