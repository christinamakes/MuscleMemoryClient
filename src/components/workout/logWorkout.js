import React from 'react';
import { connect } from 'react-redux';
import { completeWorkout, getWorkouts } from '../../actions/workout'
import { Field, reduxForm, reset } from 'redux-form';
import { getMusclesFromWorkout } from '../../actions/workout'
import { getExercisesFromWorkout } from '../../actions/workout';
import { Combobox } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

import '../styles/log-workout.css'

let workoutSelect;

class LogWorkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedWorkout: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(getWorkouts());
  }

  onSubmit(values) {
    return this.props.dispatch(completeWorkout(this.state.selectedWorkout))
      .then(() => this.props.dispatch(getExercisesFromWorkout()))
      .then(() => this.props.dispatch(getMusclesFromWorkout()))
      .then(() => this.props.dispatch(reset('logWorkout')))
  }


  render() {
    if (this.props.workouts) {
      workoutSelect = (
        <div className='fieldset-log-workout'>
          <label>Log a workout</label>
          <Field
            name='logWorkout'
            component={Combobox}
            data={this.props.workouts}
            placeholder={'Select workout to log'}
            caseSensitive={false}
            valueField='_id'
            textField='workoutName'
            onSelect={value => this.setState({ selectedWorkout: value._id })}
          />
        </div>)
    } else {
      workoutSelect = (
        <Combobox busy />)
    }


    return (
      <div className='complete-workout-container'>
        {/* className='complete-workout-form'  */}
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <h1>Record a workout</h1>
          <div className='workoutSelect'>{workoutSelect}</div>

          <button type="submit">Log workout</button>


        </form>
      </div>
    );
  }
}


export const mapStatetoProps = (state, props) => ({
  workouts: state.workout.workouts ? state.workout.workouts : [],
  loggedIn: state.auth.currentUser != null,
})


export default reduxForm({
  form: 'logWorkout',
})(connect(mapStatetoProps)(LogWorkout));


