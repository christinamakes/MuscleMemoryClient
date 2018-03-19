import {SubmissionError} from 'redux-form'

import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils'
console.log(API_BASE_URL);

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

export const newExercise = (exerciseName, exerciseDescription, musclesWorked) => (dispatch, getState) => {
  console.log('sending exercise with ' + exerciseDescription, exerciseName)
  const authToken = getState().auth.authToken;
  console.log(authToken);
  console.log(musclesWorked);

  return fetch(`${API_BASE_URL}/exercise`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      exerciseName, 
      exerciseDescription,
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