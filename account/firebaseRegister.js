// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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

document.getElementById("btnRegister").addEventListener('click', (e) => {
  var username = document.getElementById("usernameRegisterField").value;
  var email = document.getElementById("emailRegisterField").value;
  var password = document.getElementById("passwordRegisterField").value;
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid), {
      username: username,
      email: email
    })
    alert('User created!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  })
})
