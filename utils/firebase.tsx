// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEIUCE-oYP1EoIwGxpJzT5fufYn7jFl68",
  authDomain: "coding-test-app-67593.firebaseapp.com",
  projectId: "coding-test-app-67593",
  storageBucket: "coding-test-app-67593.appspot.com",
  messagingSenderId: "296448147737",
  appId: "1:296448147737:web:f7ca6a395fe911a9a00588",
  measurementId: "G-M36T6NT6RH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
