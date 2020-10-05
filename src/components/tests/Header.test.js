import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

test('renders header correctly', () => {
  const { getByTestId } = render(<Header />);
  const logo = getByTestId('logo');
  const mainNav = getByTestId('main-nav');

  expect(logo).toBeInTheDocument();
  expect(mainNav).toBeInTheDocument();
});
