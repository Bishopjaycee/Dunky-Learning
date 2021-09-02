import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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

const emailAuthdProvider = new firebase.auth.EmailAuthProvider();
const phoneProvider = firebase.auth.PhoneAuthProvider;
const getServerTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp();

export {
  db,
  auth,
  bucket,
  emailAuthdProvider,
  phoneProvider,
  getServerTimestamp,
};
