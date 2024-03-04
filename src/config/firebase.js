import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

/* These is the firebase configuration file */
const firebaseConfig = {
  apiKey: "AIzaSyBOs5avDW5QOipNzlY8AwaELlm7Xi9vwfA",
  authDomain: "quizapp2024-8950f.firebaseapp.com",
  projectId: "quizapp2024-8950f",
  storageBucket: "quizapp2024-8950f.appspot.com",
  messagingSenderId: "800101377313",
  appId: "1:800101377313:web:e7d8f4a7a3e38f7db1ca60",
  measurementId: "G-90LJFEEXZY"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
};
