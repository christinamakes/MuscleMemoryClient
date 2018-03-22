import React from 'react';
import requiresLogin from './requires-login';
import YourWorkouts from './workout/yourWorkouts';
import WorkoutForm from './workout/createWorkout';

import './styles/workout-page.css';

export class WorkoutPage extends React.Component {
  render() {
    return (
      <div className='workout-page'>
        <div className='workout-picture' title='Man holding a barbell'></div>
        <div className='workout-form'><WorkoutForm /></div>
        <div className='your-workouts'><YourWorkouts /></div>
      </div>
    )
  }
}


export default requiresLogin()(WorkoutPage)
