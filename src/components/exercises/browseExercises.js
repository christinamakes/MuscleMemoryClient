import React from 'react';
import {connect} from 'react-redux';
import {getExercises} from '../../actions/exercises'

class BrowseExercises extends React.Component {

  componentDidMount() {
    this.props.dispatch(getExercises());
  }

  render () {
    let exercises;
    
    if (this.props.exercises) {
      console.log(this.props.exercises)
      exercises = this.props.exercises.map(exer => 
        <div>
        <h1>{exer.exerciseName}</h1>
        <h1>{exer.exerciseDescription}</h1>
        <h1>{exer.musclesWorked.toString()}</h1>
        </div>)
    }
  
    return (<h1>{exercises}</h1>)
  }
}


export const mapStatetoProps = (state,props) => ({
  exercises: state.exercise.exercises,
}) 



export default connect(mapStatetoProps)(BrowseExercises);