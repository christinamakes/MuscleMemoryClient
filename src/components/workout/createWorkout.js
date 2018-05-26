import React from 'react';
import { Field, reduxForm, reset, formValueSelector } from 'redux-form';
import { newWorkout, getWorkouts } from '../../actions/workout'
import { Multiselect, onChange } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css'
import { connect } from 'react-redux';
import SVGUsage from '../generateColorMap';

// import validators

import Input from '../input';
import { required, notEmpty, arrayNotEmpty } from '../../validators'

import '../styles/create-workout.css'

import { getExercises } from '../../actions/exercises'
const countBy = require('lodash.countby');


let exerciseSelect;

export class WorkoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.selector = formValueSelector('workout')
    this.state = {
      muscles: []
    }
  }
  componentDidMount() {
    if (this.props.loggedIn) this.props.dispatch(getExercises());
  }


  onSubmit(values) {
    const workoutName = values.workoutName
    const exercises = values.workoutArray.map(exercise => exercise._id)

    const musclesCurrentlyUsed = this.state.muscles.map(exercise => exercise.musclesWorked.name);
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

        {/* SVG */}
        <div className='create-workout-container'>
          <div className='svg-container-create'>
            <SVGUsage
              usedMuscles={this.props.countedNames} />
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('workout')

export const mapStatetoProps = (state, props) => {
  const exercisesSelector = selector(state, 'workoutArray') || []
  const exerciseMap = exercisesSelector.map(exercise => exercise.musclesWorked.map(muscle => muscle.name));
  const newArr = [].concat.apply([], exerciseMap);
  let countedNames = countBy(newArr, (name) => {
    return name;
  });

  return {
    exercises: state.exercise.exercises,
    loggedIn: state.auth.currentUser != null,
    countedNames
  }
}


WorkoutForm = reduxForm({
  form: 'workout',
})(WorkoutForm);


export default WorkoutForm = (connect(mapStatetoProps)(WorkoutForm))