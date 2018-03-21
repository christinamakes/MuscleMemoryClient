import React from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import {newExercise, getExercises} from '../../actions/exercises';
import {connect} from 'react-redux';
// import validators

import Input from '../input';
import {required, notEmpty} from '../../validators'

import {SubmitButton} from '../styles/buttons'
import '../styles/add-exercise.css'


// local devlopment
const muscles = [{'arms':'5aa81a1ca3f42c4d7a855f91'}, 
{'legs':'5aa7efd0ead454399b4faf7f'}, 
{'shoulders': '5aa81a1ca3f42c4d7a855f94'},
{'abs':'5aa81a1ca3f42c4d7a855f96'}, 
{'chest': '5aa81a1ca3f42c4d7a855f97'},
{'glute':'5aa81a1ca3f42c4d7a855f95'},
{'back': '5aa81a1ca3f42c4d7a855f93'}]

// MLAB
// const muscles = [{'arms':'5aafe00c734d1d1b82898043'}, 
// {'legs':'5aafe06b734d1d1b8289806e'}, 
// {'shoulders': '5aafe081734d1d1b82898081'},
// {'abs':'5aafe09a734d1d1b8289808e'}, 
// {'chest': '5aafe0a4734d1d1b82898090'},
// {'glute':'5aafe08f734d1d1b82898085'},
// {'back': '5aafe075734d1d1b82898072'}]

let submit;
export class ExerciseForm extends React.Component {
  
  onSubmit(values) {
    const {exerciseName, musclesWorked} = values;
    const usedMuscles = Object.keys(musclesWorked).filter(muscle => musclesWorked[muscle]) // return all muscles set to true
    return this.props.dispatch(newExercise(exerciseName, usedMuscles))
    .then(() => this.props.dispatch(getExercises()))
    .then(() => this.props.dispatch(reset('exercise')))
  }

  
  render() {
    // let submit;
    return (
      <div className='add-exercise-container'>
      <form className='add-exercise-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <h1>Create an exercise</h1>
        <div className='fieldset-exercise'>
          <label htmlFor='exerciseName'>Exercise Name</label>
          <Field 
            component={Input} 
            type='text' 
            name='exerciseName'
            validate={[required, notEmpty]} />
        </div>

        {muscles.map((muscle, index) => { 
          const name = Object.keys(muscles[index]).toString();
          return (
            <div className='fieldset-exercise' key={index}>
              <label htmlFor={name}>{name}</label>
              <Field
                component={Input}
                id={name}
                type='checkbox'
                name={`musclesWorked.${Object.values(muscles[index])[0]}`}
                />
              </div>)
          })
        }
        <SubmitButton type='submit' disabled={this.props.pristine || this.props.submitting}>Add Exercise</SubmitButton>
      </form>
      </div>
    );
  }
}


// export const mapStatetoProps = (state, props) => ({
//   error: state.exercise.error ? state.exercise.error : ''
// })

export default reduxForm({
  form: 'exercise',
  // onSubmitFail: (errors, dispatch) => {
    // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(ExerciseForm);