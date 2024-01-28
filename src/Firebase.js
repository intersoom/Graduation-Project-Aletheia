// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7mS7apI8MnxnhrjRL7mBgr79csjJ0qlI",
  authDomain: "love-and-gravity.firebaseapp.com",
  projectId: "love-and-gravity",
  storageBucket: "love-and-gravity.appspot.com",
  messagingSenderId: "19037502334",
  appId: "1:19037502334:web:f6e2b6ec7d56e060c3d12f",
  measurementId: "G-6E3QW1861Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
