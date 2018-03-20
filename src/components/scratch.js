// FOR TESTING PURPOSES ONLY
const dbValues = {
  "Arms": 61,
  "Glutes": 1,
  "Legs": 1
}

  
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

  const colorMap = generateStrain(dbValues)

  const strain = Object.keys(colorMap).map((muscle, index) => {
    const muscleString = muscle.toString();
    return `${muscle}: ${colorMap[muscle]}`
  })



console.log(colorMap);
console.log(strain);
const test = { Arms: 'red', Glutes: 'yellow', Legs: 'yellow' }
console.log(test.Arms)

