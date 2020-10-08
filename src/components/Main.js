import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Laps from './Laps';
import RoutePlanner from './RoutePlanner';
import Explore from './Explore';
import Home from './Home';
import Profile from './Profile';

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
            <Laps />
            <RoutePlanner />
          </DndProvider>
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
