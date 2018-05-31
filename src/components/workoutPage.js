import React from 'react';
import requiresLogin from './requires-login';
import WorkedMuscles from './muscles/workedMuscles';
import WorkoutForm from './workout/createWorkout';

import './styles/workout-page.css';

export class WorkoutPage extends React.Component {
  render() {
    return (
      <div className='workout-page'>
        {/* <div className='workout-picture' title='Man holding a barbell'></div> */}
        <div className='workout-form'><WorkoutForm /></div>
        {/* <div className='create-workout-svg'><WorkedMuscles /></div> */}
      </div>
    )
  }
}


export default requiresLogin()(WorkoutPage)
