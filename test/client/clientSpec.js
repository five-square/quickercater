import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Dashboard from '../../client/components/Dashboard';

global.describe('Component: Dashboard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Dashboard />).length).to.be.above(0);
  });
});
