import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyBsUv2J-ZczfdSCruFWcELjUFkH9yi7oR0",
    authDomain: "marketingflavia-c3f07.firebaseapp.com",
    projectId: "marketingflavia-c3f07",
    storageBucket: "marketingflavia-c3f07.appspot.com",
    messagingSenderId: "437677361792",
    appId: "1:437677361792:web:2093be8b3e399b21c97465",
    measurementId: "G-CJMX89WQ7D"
  };

  //initialize firebase
  if(!firebase.apps.length){
      const app = firebase.initializeApp(firebaseConfig);

  }

  export default firebase;