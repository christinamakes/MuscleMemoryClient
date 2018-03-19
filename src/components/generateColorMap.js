// FOR TESTING PURPOSES ONLY
// const dbValues = {
//   "Arms": 61,
//   "Glutes": 1,
//   "Legs": 1
// }
import React from 'react'
import MuscleMap from './muscleMap'

export default function SVGUsage(props) {
  let colorMap;
  const generateColorMap = (dbValues) => {
    const INTENSITY_MAP = {
      1: 'yellow',
      2: 'orange',
      3: 'red',
    };
    const MAX_INTENSITY = 3
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
  )
}


// console.log(generateColorMap(dbValues));
// { Arms: 'red', Glutes: 'yellow', Legs: 'yellow' }

