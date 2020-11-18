import React, { createContext } from 'react';
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

export const FirestoreContext = createContext();
export const AuthContext = createContext();

function App() {
  return (
    <div className="app">
      <FirestoreContext.Provider value={firestore}>
        <AuthContext.Provider value={auth}>
          <Header />
          <Main />
          <Footer />
        </AuthContext.Provider>
      </FirestoreContext.Provider>
    </div>
  );
}

export default App;
