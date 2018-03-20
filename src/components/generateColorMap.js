// FOR TESTING PURPOSES ONLY
// const dbValues = {
//   "Arms": 61,
//   "Glutes": 1,
//   "Legs": 1
// }
import React from 'react'
import MuscleMap from './muscleMap'

import './styles/svg.css'

export default function SVGUsage(props) {
  let colorMap;
  const generateColorMap = (dbValues) => {
    const INTENSITY_MAP = {
      1: 'yellow', // used
      2: 'orange', // worked
      3: 'red', // intensely worked
      4: 'darkred' // strained
    };
    const MAX_INTENSITY = 4
    //Math.max.apply(null, Object.keys(INTENSITY_MAP));
    
    return Object.entries(dbValues)
    // [['Arms', 61], ['Glutes', 1] ...]
      .reduce(( muscleUseMap, [groupName, useLvl] ) => {
        muscleUseMap[groupName] = (useLvl <= MAX_INTENSITY) ? INTENSITY_MAP[useLvl] : INTENSITY_MAP[MAX_INTENSITY];
        return muscleUseMap;
      }, {});
  }

  colorMap = generateColorMap(props.usedMuscles)
  return (
    <div className='svg'>
    <MuscleMap 
        chestColor={colorMap.Chest || '#5ca2be'}
        armColor={colorMap.Arms || '#5ca2be'}
        shoulderColor={colorMap.Shoulders || '#5ca2be'}
        absColor={colorMap.Abs || '#5ca2be'}
        legsColor={colorMap.Legs || '#5ca2be'}
        backLegs={colorMap.Legs || '#5ca2be'}
        backArms={colorMap.Arms || '#5ca2be'}
        glutesColor={colorMap.Glutes || '#5ca2be'}
        backColor={colorMap.Back || '#5ca2be'}
      />
    </div>
  )
}


// console.log(generateColorMap(dbValues));
// { Arms: 'red', Glutes: 'yellow', Legs: 'yellow' }

