import React, { useContext } from 'react';
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
import Loader from './Loader';

import { AuthContext } from './App';

function Main() {
  const auth = useContext(AuthContext);

  const [user, loading] = useAuthState(auth);

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
          {loading ? (
            <Loader />
          ) : user ? (
            <Profile user={user} />
          ) : (
            <Redirect from="/profile" to="/" />
          )}
        </Route>
        <Route exact path="/create">
          {loading ? (
            <Loader />
          ) : user ? (
            <DndProvider backend={HTML5Backend}>
              <Laps />
              <RoutePlanner user={user} />
            </DndProvider>
          ) : (
            <Redirect from="/create" to="/" />
          )}
        </Route>
        <Route path="/edit/:jogRouteId">
          {loading ? (
            <Loader />
          ) : user ? (
            <DndProvider backend={HTML5Backend}>
              <Laps />
              <RoutePlanner user={user} />
            </DndProvider>
          ) : (
            <Redirect from="/edit/:jogRouteId" to="/" />
          )}
        </Route>
        <Route path="/jog-route/:jogRouteId">
          <Single />
        </Route>
        <NotFound />
      </Switch>
    </main>
  );
}

export default Main;
