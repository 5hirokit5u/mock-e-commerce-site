import { initializeApp } from 'firebase/app'; //creates and app instance
//set up authentification
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_SubjwfOIw6Q_NZK5HqWRtGm1OQEPORs",
    authDomain: "kitsu-clothing-db.firebaseapp.com",
    projectId: "kitsu-clothing-db",
    storageBucket: "kitsu-clothing-db.firebasestorage.app",
    messagingSenderId: "518240374132",
    appId: "1:518240374132:web:cd68fd1cc6b5868c80f021",
    measurementId: "G-H44QZJXYMD"
};
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
    });
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}


