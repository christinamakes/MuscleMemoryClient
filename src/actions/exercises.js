import {SubmissionError} from 'redux-form'

import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils'


export const NEW_EXERCISE_SUCCESS = 'NEW_EXERCISE_SUCCESS';
export const newExerciseSuccess = data => ({
    type: NEW_EXERCISE_SUCCESS,
    data
});

export const NEW_EXERCISE_ERROR = 'NEW_EXERCISE_ERROR';
export const newExerciseError = error => ({
    type: NEW_EXERCISE_ERROR,
    error
});

export const NEW_EXERCISE_REQUEST = 'NEW_EXERCISE_REQUEST';
export const newExerciseRequest = () => ({
    type: NEW_EXERCISE_REQUEST,
});

export const newExercise = (exerciseName, musclesWorked) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(newExerciseRequest())
  return fetch(`${API_BASE_URL}/exercise`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      exerciseName, 
      musclesWorked: musclesWorked
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  // .then(({data}) => dispatch(newExerciseSuccess(data)))
  .catch(err => {
    const {reason, message, location} = err;
    if (reason === 'ValidationError') {
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
    // dispatch(newExerciseError(err));
  });
};

export const getExercises = () => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/exercise`, {
    method: 'GET',
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => dispatch(newExerciseSuccess(data)))
  .catch(err => {
    const {reason, message, location} = err;
    if (reason === 'ValidationError') {
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
    dispatch(newExerciseError(err));
  });
}