import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA48ApK0MJABPiGSo5I1xaAJnSSB5DLMOc',
  authDomain: 'runnar-1592f.firebaseapp.com',
  databaseURL: 'https://runnar-1592f.firebaseio.com',
});

export { firebaseApp };
