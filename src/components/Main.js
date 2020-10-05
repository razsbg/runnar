import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Lap from './Lap';
import RoutePlanner from './RoutePlanner';
import Explore from './Explore';
import Home from './Home';
import Profile from './Profile';

import { laps } from '../constants';

function Main() {
  return (
    <main className="main" data-testid="main">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/explore">
          <Explore />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/create">
          <DndProvider backend={HTML5Backend}>
            <div className="drag-sources" data-testid="laps">
              <h2>Laps</h2>
              {Object.keys(laps).map((lap) => (
                <Lap key={laps[lap].name} lap={laps[lap]} />
              ))}
            </div>
            <RoutePlanner />
          </DndProvider>
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
