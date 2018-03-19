import React, {Component} from 'react' ;
// import styled from 'styled-components';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Nav, StyleLink} from './styles/links'
import {clearAuth} from '../actions/auth' 



class NavBar extends Component {
  
  render() {
    let loggedIn;
    if (this.props.loggedIn) {
      console.log('loggedin!!')
      loggedIn = <div className='loggedin'>
          <StyleLink to='/workouts'>My Workouts</StyleLink>
          <StyleLink to='/exercises'>Exercises</StyleLink>
          <StyleLink to='/dashboard'>Dashboard</StyleLink>
          <StyleLink to='/' onClick={() => this.props.dispatch(clearAuth())}>Logout</StyleLink></div>
    } else {
      loggedIn = <div className='not-loggedin'>
          <StyleLink to='/register'>Sign up</StyleLink> 
          <StyleLink to='/login'>Login</StyleLink></div>
    }

    return (
      <nav className='nav-bar'>
        <Nav>
            <StyleLink to='/'>Home</StyleLink>
            {loggedIn}
        </Nav>
      </nav>
    );
  }
}

export const mapStateToProps= (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default connect(mapStateToProps)(NavBar);