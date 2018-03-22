import React from 'react';
import {shallow, mount} from 'enzyme'
import {WorkoutPage} from '../workoutPage'
import YourWorkouts from '../workout/yourWorkouts';
import WorkoutForm from '../workout/createWorkout';


describe('<WorkoutPage/>', () => {
  it('renders without crashing', () => {
    shallow(<WorkoutPage />)
  });

  it('renders the picture div', () => {
    // const h1 = 'Foo';
    const wrapper = shallow(<WorkoutPage />);
    expect(wrapper.find('.workout-picture').length).toEqual(1);
  })

  it('renders <YourWorkouts />', () => {
    const wrapper = shallow(<WorkoutPage />);
    expect(wrapper.find(YourWorkouts).length).toEqual(1);
  })

  it('renders <WorkoutForm />', () => {
    const wrapper = shallow(<WorkoutPage />);
    expect(wrapper.find(WorkoutForm).length).toEqual(1);
  })
})
