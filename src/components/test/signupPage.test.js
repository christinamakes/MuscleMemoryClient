import React from 'react';
import {shallow} from 'enzyme';
import SignupPage from '../signupPage';

describe('<SignupPage/>', () => {
  it('renders without crashing', () => {
    shallow(<SignupPage />)
  });
});