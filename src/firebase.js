import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAgxpymxKiiv_vhUZPihjVOHH_sjqCYuco",
  authDomain: "check-stock-29cf1.firebaseapp.com",
  databaseURL: "https://check-stock-29cf1.firebaseio.com",
  projectId: "check-stock-29cf1",
  storageBucket: "check-stock-29cf1.appspot.com",
  messagingSenderId: "879174913101"
};

firebase.initializeApp(config);

const settings = {/* your settings... */ timestampsInSnapshots: true};
firebase.firestore().settings(settings);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;