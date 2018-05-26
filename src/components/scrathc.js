const countBy = require('lodash.countby');

const arr = [{
  datefield: "2018-03-21T23:02:10.621Z",
  exerciseName: "Exercise1",
  musclesWorked: [{ _id: "5aa81a1ca3f42c4d7a855f91", name: "Arms" },
  { _id: "5aa7efd0ead454399b4faf7f", name: "Legs" },
  { _id: "5aa81a1ca3f42c4d7a855f94", name: "Shoulders" },
  { _id: "5aa81a1ca3f42c4d7a855f96", name: "Abs" },
  { _id: "5aa81a1ca3f42c4d7a855f96", name: "Abs" }]
}, {
  datefield: "2018-03-21T23:02:10.621Z",
  exerciseName: "Exercise2",
  musclesWorked: [{ _id: "5aa81a1ca3f42c4d7a855f91", name: "Arms" },
  { _id: "5aa7efd0ead454399b4faf7f", name: "Legs" },
  { _id: "5aa81a1ca3f42c4d7a855f94", name: "Shoulders" },
  { _id: "5aa81a1ca3f42c4d7a855f96", name: "Abs" }]
}]

const map = arr.map(exercise => exercise.musclesWorked.map(muscle => muscle.name));
const newArr = [].concat.apply([], map);

const countedNames = countBy(newArr, (name) => {
  return name;
});



console.log(countedNames)