import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAaKhnFld_W6GN4sREQXvWvbbHvaw4dOG4",
    authDomain: "shop-29118.firebaseapp.com",
    projectId: "shop-29118",
    storageBucket: "shop-29118.appspot.com",
    messagingSenderId: "1014892132150",
    appId: "1:1014892132150:web:5ec190869b1af03301a597"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}