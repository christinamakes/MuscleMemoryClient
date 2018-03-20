import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {login} from '../../actions/auth'
import {connect} from 'react-redux';
// import validators

import Input from '../input';
import {required, notEmpty, isTrimmed} from '../../validators'

import {SubmitButton} from '../styles/buttons'


export class LoginForm extends React.Component {
  onSubmit(values) {
    const {username, password} = values;

    return this.props.dispatch(login(username, password))
      .then(() => {
        if (this.props.loggedIn) {
          this.props.history.push("/dashboard")
        }
      })
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
      <form className='login-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      {error}
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
          validate={[required, notEmpty, isTrimmed]} />
        <SubmitButton type='submit' disabled={this.props.pristine || this.props.submitting}>Login</SubmitButton>
      </form>
    );
  }
}

export const mapStateToProps = (state,props) => ({
  loggedIn: state.auth.currentUser !== null
})

export default reduxForm({
  form: 'login', 
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))})(connect(mapStateToProps)((LoginForm)));