import React from 'react';

import YourWorkouts from './workout/yourWorkouts';
import LogWorkout from './workout/logWorkout'
import WorkedMuscles from './muscles/workedMuscles'
import requiresLogin from './requires-login';
import WorkoutForm from './workout/createWorkout';
import {connect} from 'react-redux';

import './styles/dashboard-styles.css';

class Dashboard extends React.Component {

    render() {
      console.log('dashboard');
      return(
        <div className='dashboard'>
          <div className='create-workout'>
            <h1>Create a new workout</h1>
            <WorkoutForm />
          </div>
          <div className='your-workouts'>
            <h1>Hi there</h1>
            <YourWorkouts />
          </div>
          <div className='log-workout'>
            <h1>Log a workout</h1>
            <LogWorkout />
          </div>
          <div className='worked-muscles'>
            <h1>Recently used muscles</h1>
            <WorkedMuscles />
          </div>
          
          
        </div>
      )
    }
  }

  export const mapStatetoProps = (state,props) => ({
    loggedIn: state.auth.currentUser != null,
    recentMuscles: state.workout.muscles ? state.workout.muscles : [],
    recentWorkout: state.auth.currentUser ? state.auth.currentUser.recentWorkout : 'Please log in to see recent workout'
  }) 
  
  export default requiresLogin()(connect(mapStatetoProps)(Dashboard))
