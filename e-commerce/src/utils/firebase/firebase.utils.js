// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyALOjtn7jZIEUziIpNHxVfeOdOEoQDP3V8',
  authDomain: 'e-commerce-db-9450a.firebaseapp.com',
  projectId: 'e-commerce-db-9450a',
  storageBucket: 'e-commerce-db-9450a.appspot.com',
  messagingSenderId: '731145164187',
  appId: '1:731145164187:web:e34c39bf7ec0e911acfd3e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create an instance of the Google provider object - https://firebase.google.com/docs/auth/web/google-signin
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  // Forces account selection even when one account
  // is available.
  prompt: 'select_account',
});

// Initialize Firebase Authentication
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Initialize Cloud Firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // Add a new document in collection "users"
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // check data exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutAuthUser = async () => await signOut(auth);

// https://firebase.google.com/docs/auth/web/manage-users
// Manage Users
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
