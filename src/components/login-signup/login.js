import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { login } from '../../actions/auth'
import { connect } from 'react-redux';
// import validators

import Input from '../input';
import { required, notEmpty, isTrimmed } from '../../validators'

import '../styles/login.css';


export class LoginForm extends React.Component {
  onSubmit(values) {
    const { username, password } = values;

    return this.props.dispatch(login(username, password))
      .then(() => {
        if (this.props.loggedIn) {
          this.props.history.push("/dashboard")
        }
      })
  }

  render() {
    if (this.props.loggedIn) {
      this.props.history.push("/dashboard")
    }
    let error;
    if (this.props.error !== null) {
      error = (
        <div className="form-error">
          <p>Incorrect username or password</p>
        </div>
      );
    } else {
      error = (
        <div className="form-error">

        </div>
      )
    }
    let loading;
    if (this.props.loading) {
      error = (
        <div className="form-loading">
          <p>Loading, hang tight!</p>
        </div>
      );
    } else {
      error = (
        <div className="form-loading">

        </div>
      );
    }
    return (
      <div className='flex-container-log'>
        <div className='row-log'>
          <div className='flex-item-log'>
            <form className='login-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
              <h1>Log in</h1>
              {error}
              {loading}
              <div className='fieldset-log'>
                <label htmlFor='username'>Username</label>
                <Field
                  component={Input}
                  type='text'
                  name='username'
                  validate={[required, notEmpty, isTrimmed]} />
              </div>

              <div className='fieldset-log'>
                <label htmlFor='password'>Password</label>
                <Field
                  component={Input}
                  type='password'
                  name='password'
                  validate={[required, notEmpty, isTrimmed]} />
              </div>
              <button type='submit' disabled={this.props.pristine || this.props.submitting}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading,
  error: state.auth.error
})

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)((LoginForm)));