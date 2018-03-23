import React from 'react'
import {connect} from 'react-redux'
import {getExercisesFromWorkout} from '../../actions/workout'

import '../styles/recent-workout.css'

class RecentWorkout extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) this.props.dispatch(getExercisesFromWorkout())
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
      <div className='disclaimer'>
        <h2>Exercise tips</h2>
          <ul>
            <li>Overworked muscles can put you at risk for injury</li>
            <li>Compound movements, such as squats, work more muscles than you think!</li>
            <li>Aim to work each muscle group at least once a week</li>
            <li>Muscle Usage Per Workout Key: </li>
            <ul className='muscle-key'>
              <li>Used: 1 time</li>
              <li>Worked: 2 times</li>
              <li>Intensly Worked: 3 times</li>
              <li>Overworked: 4 or more times</li>
            </ul>
          </ul>
      </div>
    </div>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  exercises: state.workout.recentWorkout ? state.workout.recentWorkout : []
});

export default connect(mapStateToProps)(RecentWorkout);