import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy_TO2OeMt14ZvJ9D2MZ2G1pcAGVLeHnU",
  authDomain: "protfolio-1f049.firebaseapp.com",
  projectId: "protfolio-1f049",
  storageBucket: "protfolio-1f049.firebasestorage.app",
  messagingSenderId: "636107739093",
  appId: "1:636107739093:web:14eb0e6c22a424609c375c",
  measurementId: "G-QHWNKE353S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
