import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuthState } from 'react-firebase-hooks/auth';

import Laps from './Laps';
import RoutePlanner from './RoutePlanner';
import Explore from './Explore';
import Home from './Home';
import Profile from './Profile';
import Single from './Single';
import NotFound from './NotFound';

function Main(props) {
  const [user, loading] = useAuthState(props.auth);

  return (
    <main className="main" data-testid="main">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/explore">
          <Explore firestore={props.firestore} />
        </Route>
        <Route exact path="/profile">
          {loading ? (
            <h3>Loading...</h3>
          ) : user ? (
            <Profile user={user} firestore={props.firestore} />
          ) : (
            <Redirect from="/profile" to="/" />
          )}
        </Route>
        <Route exact path="/create">
          {loading ? (
            <h3>Loading...</h3>
          ) : user ? (
            <DndProvider backend={HTML5Backend}>
              <Laps />
              <RoutePlanner user={user} firestore={props.firestore} />
            </DndProvider>
          ) : (
            <Redirect from="/create" to="/" />
          )}
        </Route>
        <Route path="/jog-route/:jogRouteId">
          <Single firestore={props.firestore} />
        </Route>
        <NotFound />
      </Switch>
    </main>
  );
}

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
};

export default Main;
