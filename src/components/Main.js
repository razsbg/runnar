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
import NotFound from './NotFound';

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
          {props.user ? (
            <Profile user={props.user} />
          ) : props.loading ? (
            <h3>Loading...</h3>
          ) : (
            <NotFound />
          )}
        </Route>
        <Route exact path="/create">
          {props.user ? (
            <DndProvider backend={HTML5Backend}>
              <Laps />
              <RoutePlanner />
            </DndProvider>
          ) : props.loading ? (
            <h3>Loading...</h3>
          ) : (
            <NotFound />
          )}
        </Route>
      </Switch>
    </main>
  );
}

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
