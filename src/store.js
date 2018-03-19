import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
// import local storage
import authReducer from './reducers/authReducer';
import exerciseReducer from './reducers/exerciseReducer';
import workoutReducer from './reducers/workoutReducer';
import {loadAuthToken} from './local-storage';
import {setAuth, refreshAuthToken} from './actions/auth';
// import setAuth and refreshAuth

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    exercise: exerciseReducer,
    workout: workoutReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

const authToken = loadAuthToken();
if (authToken)
{
  const token = authToken;
  store.dispatch(setAuth(token));
  store.dispatch(refreshAuthToken());
}

export default store;