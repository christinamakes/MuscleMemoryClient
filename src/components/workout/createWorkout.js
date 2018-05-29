import React from 'react';
import { Field, reduxForm, reset, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css'

// components
import SVGUsage from '../generateColorMap';
import Input from '../input';

// actions
import { newWorkout, getWorkouts } from '../../actions/workout'
import { getExercises } from '../../actions/exercises'

// import validators
import { required, arrayNotEmpty } from '../../validators'

// styles
import '../styles/create-workout.css'

// etc.
const countBy = require('lodash.countby');

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
    return this.props.dispatch(newWorkout(workoutName, exercises))
      .then(() => this.props.dispatch(getWorkouts()))
      .then(() => this.props.dispatch(reset('workout')))
      .then(() => console.log('success!'))
  }

  render() {
    let exerciseSelect;
    const renderMultiselect = ({ input, ...rest }) =>
      <Multiselect {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        {...rest} />

    if (this.props.exercises) { //make sure exercises are loaded from server, else display loading
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
        <div className='create-inner-container'>

          <form className='add-workout-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <h1>Create a workout</h1>
            <div className='fieldset-workout'>
              <label htmlFor='workoutName'>Workout Name</label>
              <Field
                component={Input}
                type='text'
                name='workoutName'
                placeholder='Workout name'
                validate={[required]} />
            </div>
            <div className='exerciseSelect'>{exerciseSelect}</div>
            <button type='submit' disabled={this.props.pristine || this.props.submitting || this.props.invalid}>Add Workout</button>
          </form>

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
  // [{full exercise obj..}, {...}]
  const exerciseMap = exercisesSelector.map(exercise => exercise.musclesWorked.map(muscle => muscle.name));
  // [['Legs', 'Legs', 'Arms'...]]
  const newArr = [].concat.apply([], exerciseMap);
  // ['Legs', 'Legs', 'Arms'...]
  let countedNames = countBy(newArr, (name) => {
    return name; // {'Arms': 1, 'Legs': 3...}
  });

  return {
    exercises: state.exercise.exercises,
    loggedIn: state.auth.currentUser != null,
    countedNames // required for SVG response
  }
}


WorkoutForm = reduxForm({
  form: 'workout',
})(WorkoutForm);


export default WorkoutForm = (connect(mapStatetoProps)(WorkoutForm))