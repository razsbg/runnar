import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import config from '../config';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
});

const auth = firebase.auth();
const db = firebase.database();

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app">
      <Header auth={auth} user={user} loading={loading} />
      <Main loading={loading} user={user} db={db} />
      <Footer />
    </div>
  );
}

export default App;
