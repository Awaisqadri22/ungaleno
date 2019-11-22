import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDh43kkYxMAzOFRz1UWbJFgN4XQU8CcVso",
  authDomain: "ungaleno-d1cd3.firebaseapp.com",
  databaseURL: "https://ungaleno-d1cd3.firebaseio.com",
  projectId: "ungaleno-d1cd3",
  storageBucket: "ungaleno-d1cd3.appspot.com",
  messagingSenderId: "389261621390",
  appId: "1:389261621390:web:394596e7ff22ce2dee31df",
  measurementId: "G-8ZBGH8KX5V"
};
export const createUserProfileDocument = async (userAuth, addionlaData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addionlaData
      });
    } catch (errors) {
      console.log("Error coming");
    }
  }
  return userRef;
};

export const newDocumentForNewDoctor = async (docAuth, addionlaData) => {
  if (!docAuth) return;

  const docRef = firestore.doc(`doctors/${docAuth.uid}`);

  const snapShot = await docRef.get();

  if (!snapShot.exists) {
    const {
      emailForDoctor,
      displayNameForDoctor,
      phone,
      allergies,
      direction,
      sex,
      selectedDate,
      url
    } = docAuth;
    const createdAt = new Date();

    try {
      await docRef.set({
        emailForDoctor,
        displayNameForDoctor,
        phone,
        allergies,
        direction,
        sex,
        selectedDate,
        createdAt,
        url,
        ...addionlaData
      });
    } catch (err) {
      console.log("Error coming", err);
    }
  }
  return docRef;
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
