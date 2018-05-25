import React from 'react'
import { connect } from 'react-redux'
import { getExercisesFromWorkout } from '../../actions/workout'

import '../styles/recent-workout.css'

class RecentWorkout extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn && this.props.exercises.length > 0) this.props.dispatch(getExercisesFromWorkout())
  }

  render() {
    let exercisesUsed;

    if (this.props.exercises) {
      exercisesUsed = this.props.exercises.map((exercises, i) =>
        <div key={i}>
          <li>{exercises}</li>
          {/* <h1>{workout.exercises}</h1> */}
        </div>)
    }

    return (
      <div className='exercises'>
        <h1>Exercises in your recent workout:</h1>
        <div className='exercises-in-workout'><ul>{exercisesUsed}</ul></div>
      </div>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  exercises: state.workout.recentWorkout ? state.workout.recentWorkout : [],
});

export default connect(mapStateToProps)(RecentWorkout);