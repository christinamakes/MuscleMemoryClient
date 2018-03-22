import React from 'react';
import ExerciseForm from './exercises/addExerciseForm'
import BrowseExercises from './exercises/browseExercises';
import requiresLogin from './requires-login';

import './styles/exercise-page.css'


export class ExercisePage extends React.Component {
  render() {
    return (
      <div className='exercise-page'>
        <div className='picture' title='man flipping in the sand'></div>
        <div className='exercise-form'><ExerciseForm /></div>
        <div className='browse-exercises'><BrowseExercises /></div>
      </div>
    )
  }
}

export default requiresLogin()(ExercisePage)

