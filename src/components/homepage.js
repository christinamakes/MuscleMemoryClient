import React from 'react';
import { NavLink } from 'react-router-dom';
import SignupForm from '../components/login-signup/signupForm';
import './styles/homepage.css'
const barbell = require('../assets/barbell.png');
const arrows = require('../assets/arrows.png');

export default class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage-body'>
        <div className='hp-text-container'>
          <div className='main-text'>
            <h1>Keep track of your workouts</h1>
            <p>to preform your best</p>
          </div>
        </div>
        <div className='homepage-signup-form'>
          <div className='form-pair-container'>
            <div className='form-pair'>
              <img src={barbell} alt='null'></img>
              <p>Record your workout</p>
            </div>
            <NavLink to='/login'>Login</NavLink>
          </div>
          <p className='form-divider'>or</p>
          <SignupForm />
          <p>Signup</p>
        </div>
        <div className='homepage-picture-main'></div>
      </div>)
  }
}