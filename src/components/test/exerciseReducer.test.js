import {exerciseReducer} from '../../reducers/exerciseReducer';
import {newExerciseSuccess, newExerciseError, newExerciseRequest} from '../../actions/exercises';

describe('Exercise Reducer', () => {
  it('should set the initial state', () => {
    const state = exerciseReducer(undefined, {type: '@@TEST'});
    expect(state).toEqual({
      exercises: null,
      loading: false,
      error: null,
      });
  })

  it('should return the state for an unknown action', () => {
    const currentState = {}
    const state = exerciseReducer(currentState, {type: '@@UNDEFINED'});
    expect(state).toBe(currentState)
  })
})

describe('New Exercise Success', () => {
  const exercise = {exerciseName: "Bicep Curl"}
  it('Should set exercises on the state', () => {
    let state;
    state = exerciseReducer(state, newExerciseSuccess(exercise))
    expect(state).toEqual({
      exercises: exercise,
      loading: false,
      error: null
    })
  })
})

describe('New Exercise Request', () => {
  it('Should set state to loading', () => {
    let state;
    state = exerciseReducer(state, newExerciseRequest())
    expect(state).toEqual({
      exercises: null,
      loading: true,
      error: null
    })
  })
})

describe('New Exercise Error', () => {
  const error = 'oops';
  it('Should set error on state', () => {
    let state;
    state = exerciseReducer(state, newExerciseError(error))
    expect(state).toEqual({
      exercises: null,
      loading: false,
      error: error
    })
  })
})