import React from 'react';
import requiresLogin from './requires-login';
import ShowAllWorkouts from './workout/showAllWorkouts'
import YourWorkouts from './workout/yourWorkouts';
import WorkoutForm from './workout/createWorkout';



class WorkoutPage extends React.Component {
  render() {
    return (
      <div>
        <WorkoutForm />
        <ShowAllWorkouts />
        <YourWorkouts />
      </div>
    )
  }
}


export default requiresLogin()(WorkoutPage)
