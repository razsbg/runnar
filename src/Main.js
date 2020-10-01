import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Lap from './Lap';
import RoutePlanner from './RoutePlanner';

import { laps } from './constants';

function Main() {
  return (
    <main className="main">
      <DndProvider backend={HTML5Backend}>
        <div className="drag-sources">
          <h2>Laps</h2>
          {Object.keys(laps).map((lap) => (
            <Lap key={laps[lap].name} {...laps[lap]} />
          ))}
        </div>
        <RoutePlanner />
      </DndProvider>
    </main>
  );
}

export default Main;
