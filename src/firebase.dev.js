import firebase from 'firebase'

//here is the firebase config

var config = {

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;