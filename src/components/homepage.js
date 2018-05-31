import React from 'react';
import { NavLink } from 'react-router-dom';
import SignupForm from '../components/login-signup/signupForm';
import './styles/homepage.css'
const barbell = require('../assets/barbell.png');
const trackWorkout = require('../assets/homepageCustomTrack.png')

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
              <p>Go to your account</p>
            </div>
            <NavLink to='/login'>LOGIN</NavLink>
          </div>
          <p className='form-divider'>or</p>
          <div className='form-pair-container'>
            <div className='form-pair'>
              <img src={barbell} alt='null'></img>
              <p>Make a new account</p>
            </div>
          </div>
          <SignupForm />
        </div>
        <div className='homepage-picture-main'></div>
        <div className='homepage-body-content'>
          <img src={trackWorkout} alt='null'></img>
          <div className='homepage-body-content-words'>
            <div className='homepage-word-pairs'>
              <h2>Visualize your workouts</h2>
              <p>See which muscle groups your workout uses so you can avoid overworking one group while completly missing another.</p>
            </div>
            <div className='homepage-word-pairs'>
              <h2>Create custom exercises</h2>
              <p>Customize your workout routine with your own unique exercises that can be incorporated into your workouts.</p>
            </div>
          </div>
        </div>
        <footer className='signature'>
          <p>Created by Christina Moore</p>
          <a href='https://www.christinamakes.com' target='blank'>Portfolio</a>
        </footer>
      </div>)
  }
}