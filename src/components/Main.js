import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Laps from './Laps';
import RoutePlanner from './RoutePlanner';
import Explore from './Explore';
import Home from './Home';
import Profile from './Profile';

function Main(props) {
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
          <Profile user={props.user} />
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

Main.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};

export default Main;
