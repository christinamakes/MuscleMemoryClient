import React from 'react';
import {connect} from 'react-redux';
import {getWorkouts} from '../../actions/workout'

import '../styles/your-workouts.css';

class YourWorkouts extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn && !this.props.workouts) this.props.dispatch(getWorkouts());
    
  }

  render () {
    let workouts;
    
    if (this.props.workouts) {
      workouts = this.props.workouts.map((workout, index) => 
        <div key={index}>
        <p>{workout.workoutName}</p>
        {/* <h1>{workout.exercises}</h1> */}
        </div>)
    }
  
    return (
    <div className='browse-workouts'>
      <h1>Your Workouts</h1>
      <div className='workout-list'>{workouts}</div>
    </div>)
  }
}

export const mapStatetoProps = (state,props) => ({
  workouts: state.workout.workouts,
  loggedIn: state.auth.currentUser != null
}) 

export default connect(mapStatetoProps)(YourWorkouts)