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

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// upload these categories from that shop data up into the collections

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  // init the batch and pass db
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//  best isolate and minimize the impact
export const getCategoriesAndDocuments = async () => {
  // references : A reference is a lightweight object that just points to a location in your database.
  // create references to the categories collection
  const collectionRef = collection(db, 'categories');

  // create a query against the categories collection
  const q = query(collectionRef);

  // Execute a query
  // use get() to retrieve the results:
  // getDocs() : Executes the query and returns the results as a QuerySnapshot.
  const querySnapshot = await getDocs(q);
  // A QuerySnapshot contains the results of a query. It can contain zero or more DocumentSnapshot objects.

  // querySnapshot.docs will give an array of all of those individual documents inside
  // ?
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // Add a new document in collection "users"
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

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
