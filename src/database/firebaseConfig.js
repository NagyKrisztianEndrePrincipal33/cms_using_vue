import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyAzcm0C7N7__-vAHe0COrSCEO7Kcusdznw",
    authDomain: "contact-management-syste-a22c9.firebaseapp.com",
    projectId: "contact-management-syste-a22c9",
    storageBucket: "contact-management-syste-a22c9.appspot.com",
    messagingSenderId: "309239271351",
    appId: "1:309239271351:web:7336060d79c5a47c85a232",
    measurementId: "G-46HB65HQQD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;