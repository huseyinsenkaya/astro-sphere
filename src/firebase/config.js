import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0oMFnW_Lu7Nmoc65X4p1ycuJDx5sMIgw",
  authDomain: "astrosphere-54d2c.firebaseapp.com",
  projectId: "astrosphere-54d2c",
  storageBucket: "astrosphere-54d2c.appspot.com",
  messagingSenderId: "720593756073",
  appId: "1:720593756073:web:797cb4f0163b6e805deeb8",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
