import React, {Component} from 'react' ;
// import styled from 'styled-components';
// import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
// import {Nav, StyleLink} from './styles/links'
import {clearAuth} from '../actions/auth' 

import './styles/nav.css';

class NavBar extends Component {
  
  render() {
    let loggedIn;
    if (this.props.loggedIn) {
      console.log('loggedin!!')
      loggedIn = <div className='loggedin'>
          <NavLink to='/workouts' activeClassName="active">My Workouts</NavLink>
          <NavLink to='/exercises'>Exercises</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
          <NavLink to='/' onClick={() => {
            this.props.dispatch(clearAuth())
            // FIGURE OUT WHERE OTHER REDIRECT IS COMING FROM
            // .then(() => {
            //   if (!this.props.loggedIn) {
            //     this.props.history.push("/login")
            //   }
            }}
            >Logout</NavLink></div>
    } else {
      loggedIn = <div className='not-loggedin'>
          <NavLink to='/register'>Sign up</NavLink> 
          <NavLink to='/login'>Login</NavLink></div>
    }

    return (
      <nav className='nav'>
        {/* <Nav> */}
            <NavLink style={{fontFamily:'Maven Pro', fontSize: '25px'}} to='/'>Muscle Memory</NavLink>
            {loggedIn}
        {/* </Nav> */}
      </nav>
    );
  }
}

export const mapStateToProps= (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default connect(mapStateToProps)(NavBar);