import React from 'react';
import requiresLogin from './requires-login';
import ShowAllWorkouts from './workout/showAllWorkouts'



class WorkoutPage extends React.Component {
  render() {
    return (
      <div>
        <ShowAllWorkouts />
      </div>
    )
  }
}


export default requiresLogin()(WorkoutPage)
