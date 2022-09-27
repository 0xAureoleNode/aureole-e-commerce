// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  // Forces account selection even when one account
  // is available.
  prompt: 'select_account',
});

// Initialize Firebase Authentication
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize Cloud Firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
