import React from 'react';
import {Field, reduxForm} from 'redux-form';
// import login action
// import validators
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from '../input';

//STYLES 
import {SubmitButton} from '../styles/buttons'
// import {FormContainer, CenterForm} from '../styles/forms';
import '../styles/signupForm.css';

import {required, notEmpty, isTrimmed, length, matches} from '../../validators'
const passwordLength = length({min:10, max:72});
const matchesPassword = matches('password');



export class SignupForm extends React.Component {
  onSubmit(values) {
    const {username, password, firstName, lastName} = values;
    const user = {username, password, firstName, lastName}
    console.log(user);
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username,password)));
  }

  render() {
    let error;
        if (this.props.error) {
            error = (
                <div className="form-error">
                    {this.props.error}
                </div>
            );
        }
    return (
    <div className='flex-container'>
      <div className='row'>
      <div className='flex-item'>
      {error}
        <form className='signup-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

          <div className='fieldset'>
            <label htmlFor='firstName'>First Name</label>
            <Field 
              component={Input} 
              type='text' 
              name='firstName'
              placeholder="First Name"
              validate={[required, notEmpty]} />
          </div>  
          <div className='fieldset'>
            <label htmlFor='lastName'>Last Name</label>
            <Field 
              component={Input} 
              type='text' 
              name='lastName'
              placeholder="Last Name"
              validate={[required, notEmpty]} />
            </div>
            <div className='fieldset'>
            <label htmlFor='username'>Username</label>
            <Field 
              component={Input} 
              type='text' 
              name='username'
              placeholder="Username"
              validate={[required, notEmpty, isTrimmed]} />
</div>
<div className='fieldset'>
            <label htmlFor='password'>Password</label>
            <Field 
              component={Input} 
              type='password' 
              name='password'
              placeholder="Password"
              validate={[required, notEmpty, isTrimmed, passwordLength]} />
</div>
<div className='fieldset'>
            <label htmlFor='confirmPassword'>Confim Password</label>
            <Field 
              component={Input} 
              type='password' 
              name='confirmPassword'
              placeholder="Confirm Password"
              validate={[required, notEmpty, isTrimmed, matchesPassword, passwordLength]} />
</div>
          <button type='submit' disabled={this.props.pristine || this.props.submitting}>Register</button>
        </form>
        </div>
      </div>
    </div>
    );
  }
}

export default reduxForm({
  form: 'signup',
  // onSubmitFail: (errors, dispatch) => {
    // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(SignupForm);

