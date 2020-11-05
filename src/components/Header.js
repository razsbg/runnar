import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header(props) {
  const [user, loading] = useAuthState(props.auth);
  const history = useHistory();
  const joggersRef = props.firestore.collection('joggers');

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await props.auth.signInWithPopup(provider).then(addNewUser);

    if (!loading) {
      history.push('/profile');
    }
  }

  function addNewUser(authData) {
    if (authData.additionalUserInfo.isNewUser) {
      joggersRef.doc(`${authData.user.uid}`).set({
        displayName: authData.user.displayName,
        jogRoutes: 0,
      });
    }
  }

  function logOut() {
    props.auth.signOut();
  }

  function renderNav() {
    var nav = (
      <>
        <nav className="nav" role="navigation">
          <ul>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            {renderUserLinks()}
          </ul>
        </nav>
        {renderAuthenticationButton()}
      </>
    );

    return nav;

    /* ************************************* */

    function renderUserLinks() {
      return user ? (
        <>
          <li>
            <Link to="/create">Plan a route</Link>
          </li>
          <li>
            <Link to="/profile">My profile</Link>
          </li>
        </>
      ) : null;
    }

    function renderAuthenticationButton() {
      return (
        <button onClick={user ? logOut : signInWithGoogle}>
          {user ? 'Log out' : 'Log in with Google'}
        </button>
      );
    }
  }

  return (
    <header className="header" data-testid="header">
      <div className="logo" data-testid="logo">
        <h1>
          <Link to="/">runnar</Link>
        </h1>
      </div>
      {renderNav()}
    </header>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
};

export default Header;
