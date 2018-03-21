import {NEW_EXERCISE_ERROR, NEW_EXERCISE_SUCCESS, NEW_EXERCISE_REQUEST} from '../actions/exercises';

const initialState = {
  exercises: null,
  loading: false,
  error: null,
};

function authReducer(state = initialState, action) {
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
    default: return state;
  }
}

export default authReducer;