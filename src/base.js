import firebase from 'firebase';

import config from './config';

const firebaseApp = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
});

export { firebaseApp };
