import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {newWorkout} from '../../actions/workout'
// import Multiselect from 'react-widgets/lib/Multiselect'
import {connect} from 'react-redux';

// import validators

import Input from '../input';
import {required, notEmpty} from '../../validators'

import {SubmitButton} from '../styles/buttons'

import {getExercises} from '../../actions/exercises'

let exerciseSelect;

export class WorkoutForm extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) this.props.dispatch(getExercises());
  }

  
  onSubmit(values) {
    const {workoutName, exercisesChecked} = values;
    
    const checkedExercises = Object.keys(exercisesChecked).filter(exercise => exercisesChecked[exercise]) // return all muscles set to true
    
    return this.props.dispatch(newWorkout(workoutName, checkedExercises))
      .then(() => console.log("adding wokrout " + values))
  }

  
  render() {
    if (this.props.exercises) {
      exerciseSelect = this.props.exercises.map((exercise, index) =>  { 
        const name = exercise.exerciseName;
        const eId = exercise._id;
        return (
          <div key={index}>
            <label htmlFor={name}>{name}</label>
            <Field
              component={Input}
              id={name}
              type='checkbox'
              name={`exercisesChecked.${eId}`}
              />
            </div>)
        })
      };
    
    return (
      <div>
      <form className='add-workout-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor='workoutName'>Workout Name</label>
        <Field 
          component={Input} 
          type='text' 
          name='workoutName'
          validate={[required, notEmpty]} />

          {exerciseSelect}

        <SubmitButton type='submit' disabled={this.props.pristine || this.props.submitting}>Add Workout</SubmitButton>
      </form>
      </div>
    );
  }
}


export const mapStatetoProps = (state,props) => ({
  exercises: state.exercise.exercises,
  loggedIn: state.auth.currentUser != null
}) 


export default reduxForm({
  form: 'workout',
  // onSubmitFail: (errors, dispatch) => {
    // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(connect(mapStatetoProps)(WorkoutForm));