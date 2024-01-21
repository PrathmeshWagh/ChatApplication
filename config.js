import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlks-izFfz9yFsSeG2WoY2-IHM5IjEa7Y",
  authDomain: "chatapp-b6d12.firebaseapp.com",
  projectId: "chatapp-b6d12",
  storageBucket: "chatapp-b6d12.appspot.com",
  messagingSenderId: "23360655567",
  appId: "1:23360655567:web:f05c80d72b2b0a40a3e7ba",
  measurementId: "G-E371EYVN1V",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
