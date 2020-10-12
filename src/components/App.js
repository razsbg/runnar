import React, { useState } from 'react';

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

  return (
    <div className="app">
      <Header authHandler={authHandler} uid={user.uid} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
