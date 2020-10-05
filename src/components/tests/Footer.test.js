import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

test('renders footer correctly', () => {
  const { getByTestId } = render(<Footer />);
  const copyright = getByTestId('footer-copyright');

  expect(copyright).toBeInTheDocument();
});
