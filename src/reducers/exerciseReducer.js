import {NEW_EXERCISE_ERROR, NEW_EXERCISE_SUCCESS, NEW_EXERCISE_REQUEST} from '../actions/exercises';
import {CLEAR_AUTH} from '../actions/auth';

const initialState = {
  exercises: null,
  loading: false,
  error: null,
};

export const exerciseReducer = (state = initialState, action) =>{
  switch(action.type) {
    case NEW_EXERCISE_SUCCESS: 
      return {
        ...state,
        exercises: action.data,
        loading: false,
        error: null
      }
    case NEW_EXERCISE_ERROR: 
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case NEW_EXERCISE_REQUEST: 
      return {
        ...state,
        loading:true
      }
    case CLEAR_AUTH: 
      return initialState
    default: return state;
  }
}

export default exerciseReducer;