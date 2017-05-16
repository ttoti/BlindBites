import React from 'react';
import BlindBites from '../src/app';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
      <BlindBites />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
