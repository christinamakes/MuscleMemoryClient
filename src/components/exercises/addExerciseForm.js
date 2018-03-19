import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {newExercise} from '../../actions/exercises'
// import validators

import Input from '../input';
import {required, notEmpty} from '../../validators'

import {SubmitButton} from '../styles/buttons'

const muscles = [{'arms':'5aa81a1ca3f42c4d7a855f91'}, 
{'legs':'5aa7efd0ead454399b4faf7f'}, 
{'shoulders': '5aa81a1ca3f42c4d7a855f94'},
{'abs':'5aa81a1ca3f42c4d7a855f96'}, 
{'chest': '5aa81a1ca3f42c4d7a855f97'},
{'glute':'5aa81a1ca3f42c4d7a855f95'},
{'back': '5aa81a1ca3f42c4d7a855f93'}]

console.log(Object.values(muscles[1])[0]); // get ID of arms
console.log(Object.keys(muscles[1]).toString()) // get arms
export class ExerciseForm extends React.Component {
  
  onSubmit(values) {
    const {exerciseName, exerciseDescription, musclesWorked} = values;
    
    const usedMuscles = Object.keys(musclesWorked).filter(muscle => musclesWorked[muscle]) // return all muscles set to true
    
    return this.props.dispatch(newExercise(exerciseName, exerciseDescription, usedMuscles))
      .then(() => console.log("adding exercise" + exerciseDescription))
  }

  render() {
    return (
      <form className='add-exercise-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <label htmlFor='exerciseName'>Exercise Name</label>
        <Field 
          component={Input} 
          type='text' 
          name='exerciseName'
          validate={[required, notEmpty]} />
        <label htmlFor='exerciseDescription'>Exercise Description</label>
        <Field 
          component={Input} 
          type='text' 
          name='exerciseDescription'
          validate={[required, notEmpty]} />

        {muscles.map((muscle, index) => { 
          const name = Object.keys(muscles[index]).toString();
          return (
            <div key={index}>
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
        <SubmitButton type='submit' disabled={this.props.pristine || this.props.submitting}>Login</SubmitButton>
      </form>
    );
  }
}

export default reduxForm({
  form: 'exercise',
  // onSubmitFail: (errors, dispatch) => {
    // dispatch(focus('signup', Object.keys(errors[0])))
  // }
})(ExerciseForm);