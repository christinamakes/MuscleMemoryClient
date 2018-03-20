import React from 'react';
import SignupForm from './login-signup/signupForm'

// STYLES
import './styles/signUpPage.css'


export default class SignupPage extends React.Component {
  
  render() {
    return (
      <div className='signupPage'>
      <h3>Almost there!</h3>
      <div className='signupForm'>
        <SignupForm />
      </div>
      </div>
    )
  }
}



