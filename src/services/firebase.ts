import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDwMIdZQfNo3rqxs2sbLsk6Y0mut5WUdbg",
  authDomain: "docecia-bc857.firebaseapp.com",
  projectId: "docecia-bc857",
  storageBucket: "docecia-bc857.appspot.com",
  messagingSenderId: "424091925920",
  appId: "1:424091925920:web:5962d8eb31e54b52c038c5",
  measurementId: "G-54HRD71D14"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

export { firebase, auth, firestore}