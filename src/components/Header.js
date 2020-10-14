import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header(props) {
  const history = useHistory();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await props.auth.signInWithPopup(provider);

    if (!props.loading) {
      history.push('/profile');
    }
  }

  function logOut() {
    props.auth.signOut();
    history.push('/');
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
          {props.user ? (
            <>
              <li>
                <Link to="/create">Plan a route</Link>
              </li>
              <li>
                <Link to="/profile">My profile</Link>
              </li>
              <li>
                <button onClick={logOut}>Log out</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={signInWithGoogle}>Log in with Google</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default Header;
