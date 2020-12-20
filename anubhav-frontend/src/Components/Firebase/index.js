import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABVFZp-95Lb8bjVItnKkpqwWgCDRuUacE",
    authDomain: "anubhav-a20dd.firebaseapp.com",
    projectId: "anubhav-a20dd",
    storageBucket: "anubhav-a20dd.appspot.com",
    messagingSenderId: "1091366752871",
    appId: "1:1091366752871:web:eb0ae4828c9b28a9677ac2"
  };

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };