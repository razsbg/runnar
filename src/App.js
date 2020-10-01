import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import RoutePlanner from './RoutePlanner';
import Lap from './Lap';

import { laps } from './constants';

function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <DndProvider backend={HTML5Backend}>
          <div className="drag-sources">
            <h2>Laps</h2>
            {Object.keys(laps).map((lap) => (
              <Lap key={laps[lap].name} {...laps[lap]} />
            ))}
          </div>
          <RoutePlanner />
        </DndProvider>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
