import React from 'react';
import {connect} from 'react-redux';
import {getWorkouts} from '../../actions/workout'

class YourWorkouts extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) this.props.dispatch(getWorkouts());
    
  }

  render () {
    console.log('your workouts mounted')
    let workouts;
    
    if (this.props.workouts) {
      console.log(this.props.workouts)
      workouts = this.props.workouts.map((workout, index) => 
        <div key={index}>
        <h1>{workout.workoutName}</h1>
        {/* <h1>{workout.exercises}</h1> */}
        </div>)
    }
  
    return (<h1>{workouts}</h1>)
  }
}

export const mapStatetoProps = (state,props) => ({
  workouts: state.workout.workouts,
  loggedIn: state.auth.currentUser != null
}) 

export default connect(mapStatetoProps)(YourWorkouts)