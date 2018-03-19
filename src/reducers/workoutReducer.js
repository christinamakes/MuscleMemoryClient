import {NEW_WORKOUT_ERROR, NEW_WORKOUT_SUCCESS, NEW_WORKOUT_REQUEST} from '../actions/workout';
import {GET_WORKOUT_ERROR, GET_WORKOUT_SUCCESS, GET_WORKOUT_REQUEST} from '../actions/workout';
import {GET_MUSCLES_ERROR, GET_MUSCLES_SUCCESS, GET_MUSCLES_REQUEST} from '../actions/workout';
import {COMPLETE_WORKOUT_ERROR, COMPLETE_WORKOUT_SUCCESS, COMPLETE_WORKOUT_REQUEST} from '../actions/workout';


const initialState = {
  workouts: null,
  muscles: null,
  loading: false,
  error: null
};

function workoutReducer(state = initialState, action) {
  switch(action.type) {
    case GET_WORKOUT_SUCCESS: 
      return {
        ...state,
        workouts: action.data,
        error: null,
        loading: false
      }
    case GET_WORKOUT_ERROR: 
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case GET_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_MUSCLES_SUCCESS: 
      return {
        ...state,
        muscles: action.data,
        loading: false,
        error: null
      }
    case GET_MUSCLES_ERROR: 
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case GET_MUSCLES_REQUEST: 
      return {
        ...state,
        loading: true
    }
    case NEW_WORKOUT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case NEW_WORKOUT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      }
    case NEW_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COMPLETE_WORKOUT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case COMPLETE_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COMPLETE_WORKOUT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      }
    default: return state;
  }
}

export default workoutReducer;