import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from '../Header';

test('renders header correctly', () => {
  const history = createMemoryHistory();
  const { getByRole, getByText } = render(
    <Router history={history}>
      <Header />
    </Router>
  );

  const logo = getByRole('heading', { level: 1 });
  const mainNav = getByRole(/navigation/i);
  const navList = mainNav.querySelector('ul');

  expect(logo).toBeInTheDocument();
  expect(mainNav).toBeInTheDocument();
  expect(navList).toBeInTheDocument();
  expect(navList.children).toHaveLength(3);

  // check if navigation is correctly displayed
  expect(getByText(/Explore/)).toBeInTheDocument();
  expect(getByText(/Plan a route/)).toBeInTheDocument();
  expect(getByText(/My profile/)).toBeInTheDocument();
});
