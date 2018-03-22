import React from 'react';
import {shallow} from 'enzyme'
import {ExercisePage} from '../exercisePage'
import BrowseExercises from '../exercises/browseExercises';
import ExerciseForm from '../exercises/addExerciseForm';


describe('<ExercisePage/>', () => {
  it('renders without crashing', () => {
    shallow(<ExercisePage />)
  });

  it('renders the picture div', () => {
    // const h1 = 'Foo';
    const wrapper = shallow(<ExercisePage />);
    expect(wrapper.find('.picture').length).toEqual(1);
  })

  it('renders <BrowseWorkouts />', () => {
    const wrapper = shallow(<ExercisePage />);
    expect(wrapper.find(BrowseExercises).length).toEqual(1);
  })

  it('renders <ExerciseForm />', () => {
    const wrapper = shallow(<ExercisePage />);
    expect(wrapper.find(ExerciseForm).length).toEqual(1);
  })
})
