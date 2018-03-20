// FOR TESTING PURPOSES ONLY
// const dbValues = {
//   "Arms": 61,
//   "Glutes": 1,
//   "Legs": 1
// }
import React from 'react'

export default function Strain(props) {
  let strainValues;
  const generateStrain = (dbValues) => {
    const INTENSITY_MAP = {
      1: 'used', // used
      2: 'worked', // worked
      3: 'intensly worked', // intensely worked
      4: 'overworked' // strained
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

  strainValues = generateStrain(props.usedMuscles)

  const strainText = Object.keys(strainValues).map((muscle, index) => {
    return <h1>{muscle}: {strainValues[muscle]}</h1>
  })

  return (
    <div className='muscle-strain'>
      {strainText}
    </div>
  )
}


// console.log(generateColorMap(dbValues));
// { Arms: 'red', Glutes: 'yellow', Legs: 'yellow' }

