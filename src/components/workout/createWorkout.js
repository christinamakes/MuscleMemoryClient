import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { newWorkout, getWorkouts } from '../../actions/workout'
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css'
import { connect } from 'react-redux';

// import validators

import Input from '../input';
import { required, notEmpty, arrayNotEmpty } from '../../validators'

import '../styles/create-workout.css'

import { getExercises } from '../../actions/exercises'

let exerciseSelect;

export class WorkoutForm extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) this.props.dispatch(getExercises());
  }


  onSubmit(values) {
    console.log(values);
    const workoutName = values.workoutName
    const exercises = values.workoutArray.map(exercise => exercise._id)

    return this.props.dispatch(newWorkout(workoutName, exercises))
      .then(() => this.props.dispatch(getWorkouts()))
      .then(() => this.props.dispatch(reset('workout')))
      .then(() => console.log('success!'))
  }

  render() {
    const renderMultiselect = ({ input, ...rest }) =>
      <Multiselect {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        {...rest} />

    if (this.props.exercises) {
      exerciseSelect = (
        <div >
          <label>Create a workout</label>
          <Field
            component={renderMultiselect}
            name='workoutArray'
            data={this.props.exercises}
            placeholder={'Select exercises'}
            textField={'exerciseName'}
            valueField={'_id'}
            allowCreate={false}
            validate={[arrayNotEmpty]}
          />
        </div>)
    } else {
      exerciseSelect = (<Multiselect busy />);
    }

    return (
      <div className='workout-form-container'>
        <form className='add-workout-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <h1>Create a workout</h1>
          <div className='fieldset-workout'>
            <label htmlFor='workoutName'>Workout Name</label>
            <Field
              component={Input}
              type='text'
              name='workoutName'
              validate={[required]} />
          </div>

          <div className='exerciseSelect'>{exerciseSelect}</div>

          <button type='submit' disabled={this.props.pristine || this.props.submitting || this.props.invalid}>Add Workout</button>
        </form>
      </div>
    );
  }
}


export const mapStatetoProps = (state, props) => ({
  exercises: state.exercise.exercises,
  loggedIn: state.auth.currentUser != null
})


export default reduxForm({
  form: 'workout',
  // onSubmitFail: (errors, dispatch) => {
  // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(connect(mapStatetoProps)(WorkoutForm));