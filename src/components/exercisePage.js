import React from 'react';
import ExerciseForm from './exercises/addExerciseForm'
import BrowseExercises from './exercises/browseExercises';
import requiresLogin from './requires-login';

import './styles/exercise-page.css'


class ExercisePage extends React.Component {
  render() {
    return (
      <div>
        <div className='browse-exercises'><BrowseExercises /></div>
        <div className='exercise-form'><ExerciseForm /></div>
      </div>
    )
  }
}

export default requiresLogin()(ExercisePage)

