import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import { firebaseApp } from '../base';

function Header(props) {
  function authenticate() {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(authProvider).then(props.authHandler);
  }

  return (
    <header className="header" data-testid="header">
      <div className="logo" data-testid="logo">
        <h1>
          <Link to="/">runnar</Link>
        </h1>
      </div>
      <nav className="nav" role="navigation">
        <ul>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/create">Plan a route</Link>
          </li>

          {props.uid ? (
            <>
              <li>
                <Link to="/profile">My profile</Link>
              </li>
              <li>
                <button onClick={props.logOut}>Log out</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={authenticate}>Log in with Google</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  uid: PropTypes.string,
  authHandler: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Header;
