import React from 'react';
import requiresLogin from './requires-login';
import ShowAllWorkouts from './workout/showAllWorkouts'
import YourWorkouts from './workout/yourWorkouts';



class WorkoutPage extends React.Component {
  render() {
    return (
      <div>
        <ShowAllWorkouts />
        <YourWorkouts />
      </div>
    )
  }
}


export default requiresLogin()(WorkoutPage)
