import React from 'react';
import {connect} from 'react-redux';
import {getExercises} from '../../actions/exercises'

import '../styles/browse-exercises.css'
class BrowseExercises extends React.Component {

  componentDidMount() {
    if (!this.props.exercises) this.props.dispatch(getExercises());
  }

  
  render () {
    let exercises;
    if (this.props.exercises) {
      exercises = this.props.exercises.map((exer, index) => 
        <div key={index}>
        <p>{exer.exerciseName}</p>
        </div>)
    }
  
    return (<div className='browse-exercises'>
      <h1>Your Exercises</h1>
      <div className='exercise-list'>{exercises}</div>
    </div>)
  }
}


export const mapStatetoProps = (state,props) => ({
  exercises: state.exercise.exercises,
}) 



export default connect(mapStatetoProps)(BrowseExercises);