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

//check user signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, instantly redirect them to the homepage
    location.replace("../homepage final/index.html")
  }
  // Not signed in
  else {
    document.getElementById("btnLogin").addEventListener('click', (e) => {
      var emailLogin = document.getElementById("emailLoginField").value;
      var passwordLogin = document.getElementById("passwordLoginField").value;
      signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
    
        const date = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: date,
        }).then(function() {
          //alert('Successfully logged in! You will now be redirected to the home page.');
          location.replace("../homepage final/index.html")
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // Customise error messages to be more intuitive
        if (errorCode == "auth/missing-password") {
          alert("Please provide a password!")
        }
        if (errorCode == "auth/invalid-email") {
          alert("Please provide a valid email format!")
        }
        if (errorCode == "auth/invalid-login-credentials") {
          alert("Invalid login credentials! Check that you have entered them correctly.")
        }
      })
    })
  }

});

