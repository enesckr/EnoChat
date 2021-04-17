import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD59W3QT2bwjHi-5MGnkyk5CaUNhAWQgKg",
  authDomain: "enochat-f9213.firebaseapp.com",
  projectId: "enochat-f9213",
  storageBucket: "enochat-f9213.appspot.com",
  messagingSenderId: "977915188557",
  appId: "1:977915188557:web:c1dfe530e4f16636775304",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
