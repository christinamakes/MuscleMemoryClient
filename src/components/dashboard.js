import React from 'react';

import LogWorkout from './workout/logWorkout'
import WorkedMuscles from './muscles/workedMuscles'
import requiresLogin from './requires-login';

import RecentWorkout from './workout/recentWorkout';
import {connect} from 'react-redux';

import './styles/dashboard-styles.css';

class Dashboard extends React.Component {

    render() {
      return(
    
        <div className='dashboard-container'>
          <div className='inner-container'>
            <div className='worked-muscles'>
              <WorkedMuscles />
            </div>

            <div className='recent-workout'>
              <RecentWorkout />
            </div>

            <div className='log-workout'>
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
