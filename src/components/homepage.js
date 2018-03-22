import React from 'react';
import {NavLink} from 'react-router-dom';

import './styles/homepage.css'

export default class HomePage extends React.Component {
  render() {
    return(
      <div className='homepage'>
      <div className='font-wrapper'>
        <h1>YOU GOT THIS.</h1>
      </div>
      <div className='buttons'>
        <NavLink to='/login'>Log In </NavLink>
        <NavLink to='/register'>Sign up</NavLink>
      </div>
      </div>)
  }
}