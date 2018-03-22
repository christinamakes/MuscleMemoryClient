import React from 'react';
import {shallow, Mount} from 'enzyme'
import {NavLink} from 'react-router-dom';
import HomePage from '../homepage'


describe('<App/>', () => {
  it('renders without crashing', () => {
    shallow(<HomePage />)
  });

  it('renders the links', () => {
    // const h1 = 'Foo';
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find(NavLink).length).toEqual(2);
  })
})
