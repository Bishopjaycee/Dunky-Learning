import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import { firebaseConfig } from "../../key";

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
  } catch (error) {
    console.error(error);
  }
}

const db = firebase.firestore();
const auth = firebase.auth();
const bucket = firebase.storage();
const relDB = firebase.database();
const emailAuthdProvider = new firebase.auth.EmailAuthProvider();
const phoneProvider = firebase.auth.PhoneAuthProvider;
const getServerTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp();
const getRelDBServerTimestamp = () => {
  firebase.database.ServerValue.TIMESTAMP;
};
export {
  db,
  auth,
  bucket,
  relDB,
  emailAuthdProvider,
  phoneProvider,
  getServerTimestamp,
  getRelDBServerTimestamp,
};
