import React from 'react';

import YourWorkouts from './workout/yourWorkouts';
import LogWorkout from './workout/logWorkout'
import WorkedMuscles from './muscles/workedMuscles'
import requiresLogin from './requires-login';

import RecentWorkout from './workout/recentWorkout';
import {connect} from 'react-redux';

import './styles/dashboard-styles.css';

class Dashboard extends React.Component {

    render() {
      console.log('dashboard');
      return(
    
        <div className='dashboard-container'>
          <div className='inner-container'>
            <div className='worked-muscles'>
              <WorkedMuscles />
            </div>

            <div className='recent-workout'>
              <h1>Your recent workout</h1>
              <RecentWorkout />
            </div>

            <div className='log-workout'>
              <h1>Log a workout</h1>
              <LogWorkout />
            </div>
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
