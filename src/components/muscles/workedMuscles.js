import React from 'react';
import {connect} from 'react-redux';
import {getMusclesFromWorkout} from '../../actions/workout'
import MuscleMap from '../muscleMap';
import SVGUsage from '../generateColorMap';
import Strain from '../generateStrain';

// console.log(generateColorMap)


class WorkedMuscles extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn && this.props.recentWorkout) this.props.dispatch(getMusclesFromWorkout());
  }

  render () {
    let musclesUsed;

    const usedMuscles = this.props.recentMuscles;

    return (<div>
      {musclesUsed}
      <SVGUsage 
        usedMuscles={usedMuscles}/> {/* SVG */}
      <Strain
        usedMuscles={usedMuscles} />
      </div>)
  }
  
}

export const mapStatetoProps = (state,props) => ({
  loggedIn: state.auth.currentUser != null,
  recentMuscles: state.workout.muscles ? state.workout.muscles : [],
  recentWorkout: state.auth.currentUser ? state.auth.currentUser.recentWorkout : 'Please log in to see recent workout'
}) 

export default connect(mapStatetoProps)(WorkedMuscles)