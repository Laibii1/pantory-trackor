// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Y4NAEWZH3khBFHiFUeqwmB7rWKIvUOI",
  authDomain: "pantory-trackor.firebaseapp.com",
  projectId: "pantory-trackor",
  storageBucket: "pantory-trackor.appspot.com",
  messagingSenderId: "756020290378",
  appId: "1:756020290378:web:7500f39892380290ea57b3",
  measurementId: "G-VKLNE63WDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore};