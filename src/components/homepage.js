import React from 'react';
import { NavLink } from 'react-router-dom';
import SignupForm from '../components/login-signup/signupForm';

import './styles/homepage.css'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage-body'>
        <div className='hp-text-container'>
          <div className='main-text'>
            <h1>Make the most of anything</h1>
            <p>Lorem ipsum lorem lorem ipsum</p>
          </div>
        </div>
        <div className='homepage-signup-form'>
          <SignupForm />
          <p>Login</p>
          <p>Signup</p>
        </div>
        <div className='homepage-picture-main'></div>
      </div>)
  }
}