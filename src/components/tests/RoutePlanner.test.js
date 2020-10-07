import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import RoutePlanner from '../RoutePlanner';

afterAll(() => {
  cleanup();
});

test('renders correctly', () => {
  const { getByRole } = render(
    <DndProvider backend={HTML5Backend}>
      <RoutePlanner />
    </DndProvider>
  );

  expect(getByRole('heading')).toBeInTheDocument();
});
