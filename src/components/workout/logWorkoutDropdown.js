import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Combobox } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

let logWorkoutForm = props => {

  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Log a workout</label>
        <Field
          name='logWorkout'
          component={Combobox}
          data={this.props.workouts}
          defaultValue={this.props.workouts[0]}
          caseSensitive={false}
        // valueField='value'
        // textField='workout'
        />
      </div>
    </form>
  )
}

export default logWorkoutForm;