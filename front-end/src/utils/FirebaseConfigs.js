import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARAauZM_JoQB7MwtMSuwc_o2tF7msrMWc",
    authDomain: "sampleproject-e449f.firebaseapp.com",
    projectId: "sampleproject-e449f",
    storageBucket: "sampleproject-e449f.appspot.com",
    messagingSenderId: "393912145916",
    appId: "1:393912145916:web:44b97750037b921aec0479",
    measurementId: "G-5L4XB7FE0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const FireBase = getFirestore(app);
console.log("FireBase", FireBase)
export default FireBase;