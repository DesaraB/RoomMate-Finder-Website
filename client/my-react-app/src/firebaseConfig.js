// client/src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC38jPc5fPLkxkx7wqPj7JjTi53yysA744",
  authDomain: "roommatefinder-e3065.firebaseapp.com",
  projectId: "roommatefinder-e3065",
  storageBucket: "roommatefinder-e3065.firebasestorage.app",
  messagingSenderId: "780412896534",
  appId: "1:780412896534:web:c65be821f3001cec6a7c37",
  measurementId: "G-PFJM1L229R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
