import React from 'react';
import { render } from '@testing-library/react';
import Main from '../Main';

test('renders main correctly', () => {
  const { getByTestId } = render(<Main />);
  const lapsContainer = getByTestId('laps');
  const routePlanner = getByTestId('route-planner');

  expect(lapsContainer).toBeInTheDocument();
  expect(routePlanner).toBeInTheDocument();
});
