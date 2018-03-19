import React from 'react';
import requiresLogin from '../requires-login';
import {connect} from 'react-redux';
import SVGUsage from '../generateColorMap'
import {API_BASE_URL} from '../../config';
import {normalizeResponseErrors} from '../../actions/utils'
import { getWorkoutRequest } from '../../actions/workout';




class ShowAllWorkout extends React.Component {
  

  render() {
    
    // this.props.dispatch(getWorkoutRequest);
    return (
      <h1>hi</h1>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  authToken: state.auth.currentUser.authToken,
  userId: state.auth.currentUser.userId,
  loggedIn: state.auth.currentUser !== null,
  userWorkouts: state.workout.workouts ? state.workout.workouts : []
})

export default requiresLogin()(connect(mapStateToProps)(ShowAllWorkout))