import React from 'react'
import {connect} from 'react-redux'
import {getExercisesFromWorkout} from '../../actions/workout'

import '../styles/recent-workout.css'

class RecentWorkout extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) this.props.dispatch(getExercisesFromWorkout())
    console.log('recent workout dispatched');
  }

  render() {
    let exercisesUsed;
    
    if (this.props.exercises) {
      exercisesUsed = this.props.exercises.map((exercises, i) => 
        <div key={i}>
        <h2>{exercises}</h2>
        {/* <h1>{workout.exercises}</h1> */}
        </div>)
    }
  
    return (<div className='exercises'><h1>Your recent workout:</h1>{exercisesUsed}</div>)
  }
}

export const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  exercises: state.workout.recentWorkout ? state.workout.recentWorkout : []
});

export default connect(mapStateToProps)(RecentWorkout);