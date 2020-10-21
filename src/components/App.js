import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from '../config';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const joggersRef = firestore.collection('joggers');
  return (
    <div className="app">
      <Header auth={auth} joggersRef={joggersRef} />
      {/* <Main loading={loading} user={user} db={db} /> */}
      <Footer />
    </div>
  );
}

export default App;
