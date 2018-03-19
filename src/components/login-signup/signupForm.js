import React from 'react';
import {Field, reduxForm} from 'redux-form';
// import login action
// import validators
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from '../input';

//STYLES 
import {SubmitButton} from '../styles/buttons'
import {RegForm, FormContainer} from '../styles/forms';
import '../styles/signupForm.css';

import {required, notEmpty, isTrimmed, length, matches} from '../../validators'
const passwordLength = length({min:5, max:72});
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
    return (
      <FormContainer>
        <RegForm className='signup-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <label htmlFor='firstName'>First Name</label>

          <Field 
            component={Input} 
            type='text' 
            name='firstName'
            validate={[required, notEmpty]} />
            
          <label htmlFor='lastName'>Last Name</label>
          <Field 
            component={Input} 
            type='text' 
            name='lastName'
            validate={[required, notEmpty]} />
          <label htmlFor='username'>Username</label>
          <Field 
            component={Input} 
            type='text' 
            name='username'
            validate={[required, notEmpty, isTrimmed]} />
          <label htmlFor='password'>Password</label>
          <Field 
            component={Input} 
            type='password' 
            name='password'
            validate={[required, notEmpty, isTrimmed, passwordLength]} />
          <label htmlFor='confirmPassword'>Confim Password</label>
          <Field 
            component={Input} 
            type='password' 
            name='confirmPassword'
            validate={[required, notEmpty, isTrimmed, matchesPassword, passwordLength]} />
          <SubmitButton type='submit' disabled={this.props.pristine || this.props.submitting}>Register</SubmitButton>
        </RegForm>
      </FormContainer>
    );
  }
}

export default reduxForm({
  form: 'signup',
  // onSubmitFail: (errors, dispatch) => {
    // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(SignupForm);

