import React, { useState } from 'react';
import firebase from 'firebase';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  const [user, setUser] = useState({
    uid: null,
    displayName: null,
    photoUrl: null,
  });

  function authHandler(authData) {
    setUser({
      uid: authData.user.uid,
      displayName: authData.user.displayName,
      photoUrl: authData.user.photoURL,
    });
  }

  async function logOut() {
    await firebase.auth().signOut();

    setUser({
      uid: null,
      displayName: null,
      photoUrl: null,
    });
  }

  return (
    <div className="app">
      <Header authHandler={authHandler} logOut={logOut} uid={user.uid} />
      <Main user={user} />
      <Footer />
    </div>
  );
}

export default App;
