import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
//here is the firebase config
};

firebase.initializeApp(config);

const settings = {/* your settings... */ timestampsInSnapshots: true};
firebase.firestore().settings(settings);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;