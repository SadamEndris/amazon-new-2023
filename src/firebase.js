// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'

// new updates
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE2o7jflfYT29mKJ6whlMtuQvVpz2rJXA",
  authDomain: "new-a8a56.firebaseapp.com",
  projectId: "new-a8a56",
  storageBucket: "new-a8a56.appspot.com",
  messagingSenderId: "774286204684",
  appId: "1:774286204684:web:d428054755515a37eab329",
  measurementId: "G-JW60X36DJ9",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
const app = firebase.initializeApp(firebaseConfig);
// const auth = getAuth(app)
const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
