import { initializeApp } from "firebase/app";
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
  getFirestore, //get the database
  doc, //get a particular document in the firebase collection
  getDoc, //get the data for the fetched document (eg: collection: all users, document: individual user, data: individual user info )
  setDoc, //set the data for the fetched document
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnuwxrohNV0MhW8mmxWocfCLv2gHKtkq0",
  authDomain: "clothing-ecommerce-4b7c3.firebaseapp.com",
  projectId: "clothing-ecommerce-4b7c3",
  storageBucket: "clothing-ecommerce-4b7c3.appspot.com",
  messagingSenderId: "891406062754",
  appId: "1:891406062754:web:ecb0483999df4e4d3e33fb"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); //provider used for google sign in. We have a different provider for facebook sign in

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider); //implicit return
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); //implicit return. Look into this method if needed. Refer module 6, lecture 97

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; //if no access token received, return (access denied)

  const userDocRef = doc(db, 'users', userAuth.uid); //get a specific user from db

  const userSnapshot = await getDoc(userDocRef); //fetch the details of that user

  if (!userSnapshot.exists()) { //this block will run if fetched details don't point to an existing user in the db
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { //creating the user with required details, using object destructuring here in case there are any keys in additionalInformation object
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef; //returns the info of the user if they exist in the db
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => //this listener get a callback func, which we pass to the onAuthStateChanged observer function in firebase
  onAuthStateChanged(auth, callback);