import React from 'react';
import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import RoutePlanner from '../RoutePlanner';

test('renders correctly', () => {
  const { getByRole, getByTestId } = render(
    <DndProvider backend={HTML5Backend}>
      <RoutePlanner />
    </DndProvider>
  );

  expect(getByRole('heading', { size: 3 })).toBeInTheDocument();
  expect(getByTestId('drop-zone')).toBeInTheDocument();
});
