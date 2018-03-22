import React, { Component } from 'react';
import './styles/App.css';
// import Tilt from 'react-tilt';
import NavBar from './navBar';
import SignupPage from './signupPage'
import Login from './login-signup/login';
import ExercisePage from './exercisePage';
import WorkoutPage from './workoutPage';
import Dashboard from './dashboard';
import HomePage from './homepage';

import {Route} from 'react-router-dom';
import {refreshAuthToken} from '../actions/auth'



class App extends Component {
  
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // refresh token when logged in
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // stop refesh on log out
        this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // refresh auth token every hour
    )
  };

  stopPeriodicRefresh() {
    if(!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval)
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/register' component={SignupPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/exercises' component={ExercisePage} />
        <Route exact path='/workouts' component={WorkoutPage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/' component={HomePage} />
      </div>
    );
  }
}

// export const mapStateToProps = (state, props) => ({
//   loggedIn: state.auth.currentUser !== null
// })

// export default connect(mapStateToProps)(App);


export default (App);