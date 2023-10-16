// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQuYzHV8SGG_Mr_kKCEZXeqGUwixIhX1s",
  authDomain: "ecobites-b5084.firebaseapp.com",
  projectId: "ecobites-b5084",
  storageBucket: "ecobites-b5084.appspot.com",
  messagingSenderId: "256057404957",
  appId: "1:256057404957:web:deecd1dfbcb5f83e1460f4",
  measurementId: "G-GZ4EDQDHRT",
  databaseURL: "https://ecobites-b5084-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

document.getElementById("btnLogin").addEventListener('click', (e) => {
  var emailLogin = document.getElementById("emailLoginField").value;
  var passwordLogin = document.getElementById("passwordLoginField").value;
  console.log(emailLogin);
  console.log(passwordLogin);
  signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
  .then((userCredential) => {
    // Logged in
    const user = userCredential.user;
    console.log(emailLogin);
    console.log(passwordLogin);

    const date = new Date();
    update(ref(database, 'users/' + user.uid), {
      last_login: date,
    })
    console.log(emailLogin);
    console.log(passwordLogin);
    alert('User logged in!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  })
})
