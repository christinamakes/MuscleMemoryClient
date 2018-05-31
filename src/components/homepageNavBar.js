import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'
import { clearAuth } from '../actions/auth'

import './styles/homepageNav.css';

class HomepageNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true
    }

  }

  handleStateChange(state) {
    this.setState({ isOpen: state.isOpen })
  }

  closeMenu() {
    this.setState({ isOpen: false })
  }


  render() {
    let loggedIn;
    if (this.props.loggedIn) {
      // console.log('loggedin!!')
      loggedIn = <div className='loggedin'>
        <NavLink to='/workouts' onClick={() => this.closeMenu()}>Create Workout</NavLink>
        <NavLink to='/exercises' onClick={() => this.closeMenu()}>Exercises</NavLink>
        <NavLink to='/dashboard' onClick={() => this.closeMenu()}>Dashboard</NavLink>
        <NavLink to='/' onClick={() => {
          this.closeMenu();
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
        <span className='btn-bld'><NavLink to='/register' onClick={() => this.closeMenu()}>Sign up</NavLink></span>
        <NavLink to='/login' onClick={() => this.closeMenu()}>Login</NavLink></div>
    }


    return (
      <div>
        <div className='mobile-only-nav-homepage'>
          <Menu
            isOpen={this.state.isOpen}
            onStateChange={(state) => this.handleStateChange(state)}
            width={'100%'}>
            <NavLink style={{ fontFamily: 'Maven Pro', fontSize: '25px' }} to='/' onClick={() => this.closeMenu()}>Muscle Memory</NavLink>
            {loggedIn}
          </Menu>
        </div>
        <nav className='nav-homepage'>
          <NavLink style={{ fontFamily: 'Maven Pro', fontSize: '30px' }} to='/' onClick={() => this.closeMenu()}>Muscle Memory</NavLink>
          {loggedIn}
        </nav>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default connect(mapStateToProps)(HomepageNavBar);