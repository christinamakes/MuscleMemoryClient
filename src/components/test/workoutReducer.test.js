import {workoutReducer} from '../../reducers/workoutReducer';
import {newWorkoutSuccess, newWorkoutError, newWorkoutRequest, getMusclesSuccess, getMusclesRequest, getMusclesError} from '../../actions/workout';
import {getWorkoutSuccess, getWorkoutRequest, getWorkoutError} from '../../actions/workout';


describe('Workout Reducer', () => {
  it('should set the initial state', () => {
    let state;
    state = workoutReducer(undefined, {type: '@@TEST'});
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: false,
      error: null
    })
  })

  it('should return the state for an undefined action', () => {
    const currentState = {};
    const state = workoutReducer(currentState, {type: '@@UNDEFINED'});
    expect(state).toBe(currentState)
  })
})

describe('Success', () => {
  const workouts = {workout: 'yay'};
  const muscles = {muscles: 'bicep'};

  it('Should get set state to loading', () => {
    let state;
    state = workoutReducer(state, getWorkoutSuccess(workouts));
    expect(state).toEqual({
      workouts,
      recentWorkout: null,
      muscles: null,
      loading: false,
      error: null
    })
  })

  it('Should get muscles from workout on success', () => {
    let state;
    state = workoutReducer(state, getMusclesSuccess(muscles));
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles,
      loading: false,
      error: null
    })
  })
})

describe('Requests', () => {

  it('Should set state to loading for get workout', () => {
    let state;
    state = workoutReducer(state, getWorkoutRequest());
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: true,
      error: null
    })
  })

  it('Should set state to loading for get muscles', () => {
    let state;
    state = workoutReducer(state, getMusclesRequest());
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: true,
      error: null
    })
  })

  it('Should set state to loading for new workout', () => {
    let state;
    state = workoutReducer(state, newWorkoutRequest());
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: true,
      error: null
    })
  })
})

describe('Errors', () => {
  const error = 'ooops';
  it('Should set state to error for get workout', () => {
    let state;
    state = workoutReducer(state, getWorkoutError(error));
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: false,
      error: error
    })
  })

  it('Should set state to error for get muscles', () => {
    let state;
    state = workoutReducer(state, getMusclesError(error));
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: false,
      error: error
    })
  })

  it('Should set state to error for new workout', () => {
    let state;
    state = workoutReducer(state, newWorkoutError(error));
    expect(state).toEqual({
      workouts: null,
      recentWorkout: null,
      muscles: null,
      loading: false,
      error: error
    })
  })
})