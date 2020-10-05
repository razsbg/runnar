import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders app correctly', () => {
  const { getByTestId } = render(<App />);

  const header = getByTestId('header');
  const main = getByTestId('main');
  const footer = getByTestId('footer');

  expect(header).toBeInTheDocument();
  expect(main).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
