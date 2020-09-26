import * as firebase from 'firebase';

import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwFGHpWf0UQ0-xP7iE0xFZ2qBEHkNFBXs",
  authDomain: "scheduler-f164d.firebaseapp.com",
  databaseURL: "https://scheduler-f164d.firebaseio.com",
  projectId: "scheduler-f164d",
  storageBucket: "scheduler-f164d.appspot.com",
  messagingSenderId: "288740574275",
  appId: "1:288740574275:web:e332a6910b482cc78a00f6",
  measurementId: "G-8HTP92KRTP"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
