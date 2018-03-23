import React from 'react';
import {connect} from 'react-redux';
import {completeWorkout, getWorkouts} from '../../actions/workout'
import {Field, reduxForm, reset} from 'redux-form';
import Input from '../input';
import {getMusclesFromWorkout} from '../../actions/workout'
import {getExercisesFromWorkout} from '../../actions/workout';

// STYLES
// import {SubmitButton} from '../styles/buttons'
import '../styles/log-workout.css'

let workoutSelect;

class LogWorkout extends React.Component {

  componentDidMount() {
    if (!this.props.workouts) this.props.dispatch(getWorkouts());
  }

  onSubmit(values) {
    const {workoutSelected} = values;
    
    const checkedWorkout = Object.keys(workoutSelected).filter(workout => workoutSelected[workout]) // return all muscles set to true
  
    return this.props.dispatch(completeWorkout(checkedWorkout))
      .then(() => this.props.dispatch(getMusclesFromWorkout()))
      .then(() => this.props.dispatch(getExercisesFromWorkout()))
      .then(() => this.props.dispatch(reset('logWorkout')))
  }

  
  render() {
    if (this.props.workouts) {
      workoutSelect = this.props.workouts.map((workout, index) =>  { 
        const name = workout.workoutName;
        const wId = workout._id;
        return (
          <div className='fieldset-log-workout' key={index}>
            <label htmlFor={name}>{name}</label>
            <Field
              component={Input}
              id={name}
              type='checkbox'
              name={`workoutSelected.${wId}`}
              />
            </div>)
        })
      };
    
    return (
      <div className='complete-workout-container'>
      
      <form className='complete-workout-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <h1>Record a workout</h1>
          {workoutSelect}

        <button type='submit' disabled={this.props.pristine || this.props.submitting}>Record</button>
      </form>
      </div>
    );
  }
}

export const mapStatetoProps = (state,props) => ({
  workouts: state.workout.workouts,
  loggedIn: state.auth.currentUser != null
}) 


export default reduxForm({
  form: 'logWorkout',
  // onSubmitFail: (errors, dispatch) => {
    // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(connect(mapStatetoProps)(LogWorkout));


