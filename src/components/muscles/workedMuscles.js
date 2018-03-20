import React from 'react';
import {connect} from 'react-redux';
import {getMusclesFromWorkout} from '../../actions/workout'
import SVGUsage from '../generateColorMap';
import Strain from '../generateStrain';

// console.log(generateColorMap)
import '../styles/workedMuscles.css'

class WorkedMuscles extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn && this.props.recentWorkout) this.props.dispatch(getMusclesFromWorkout());
  }

  render () {
    const usedMuscles = this.props.recentMuscles;

    return (
      <div className='workedMuscles-container'>
        <div className='svg-container'>
          <SVGUsage 
            usedMuscles={usedMuscles}/> {/* SVG */}
        </div>
        <div className='muscleStrain-container'>
          <Strain
            usedMuscles={usedMuscles} />
        </div>
        <div className='disclaimer'>
          <p>Do not overwork your muscles</p>
        </div>
      </div>
      )
  }
  
}

export const mapStatetoProps = (state,props) => ({
  loggedIn: state.auth.currentUser != null,
  recentMuscles: state.workout.muscles ? state.workout.muscles : [],
  recentWorkout: state.auth.currentUser ? state.auth.currentUser.recentWorkout : 'Please log in to see recent workout'
}) 

export default connect(mapStatetoProps)(WorkedMuscles)