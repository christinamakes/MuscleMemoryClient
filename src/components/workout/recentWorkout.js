import React from 'react'
import {connect} from 'react-redux'
import {getExercisesFromWorkout} from '../../actions/workout'

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
        <h1>{exercises}</h1>
        {/* <h1>{workout.exercises}</h1> */}
        </div>)
    }
  
    return (<h1>{exercisesUsed}</h1>)
  }
}

export const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  exercises: state.workout.recentWorkout ? state.workout.recentWorkout : []
});

export default connect(mapStateToProps)(RecentWorkout);