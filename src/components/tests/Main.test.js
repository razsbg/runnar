import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Main from '../Main';
import Header from '../Header';

test('renders correctly', () => {
  const leftClick = { button: 0 };
  const history = createMemoryHistory();
  const { getByText, getByTestId } = render(
    <Router history={history}>
      <Header />
      <Main />
    </Router>
  );

  expect(getByText(/this is the home page/i)).toBeInTheDocument();

  // navigate to /explore
  userEvent.click(getByText(/Explore/), leftClick);
  expect(getByText(/this is the explore routes page/i)).toBeInTheDocument();

  // navigate to /create
  userEvent.click(getByText(/Plan a route/), leftClick);
  expect(getByTestId('route-planner')).toBeInTheDocument();

  // navigate to /profile
  userEvent.click(getByText(/My profile/), leftClick);
  expect(getByText(/this is the profile page/i)).toBeInTheDocument();
});
