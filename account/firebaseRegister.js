// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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
  var userExists = false
  var username = document.getElementById("usernameRegisterField").value;
  var email = document.getElementById("emailRegisterField").value;
  var password = document.getElementById("passwordRegisterField").value;
  const usernames = ref(database, 'usernames/')
  // Check database "usernames" folder if selected username exists
  onValue(usernames, (snapshot) => {
    const allUsernamesData = snapshot.val()
    for (let uname in allUsernamesData) {
      // Since JS is case-sensitive, standardise set to lower case for existing stored usernames and input
      // for accurate comparison (E.g. john != John and will still be wrongly added to db which should not be allowed!)
      if (uname.toLowerCase() == username.toLowerCase()) {
         // Username already exists
        userExists = true
      }
    }
    // Username does not exist
    // Create this user into database 
    if (!userExists) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, 'users/' + user.uid), {
          email: email,
          // Set redirecting user to registration success page to occur ONLY AFTER the data has been written into the database
        }).then(function() {
          set(ref(database, 'users/' + user.uid + '/mealplans/'), {
            username: username,
          }).then(function() {
            set(ref(database, 'usernames/' + username), {
              uid: user.uid,
            }).then(function() {
              location.replace("registerSuccess.html")
            })
          })
        })
    
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        // Customise error messages to be more intuitive
        if (errorCode == "auth/missing-password") {
          alert("Please provide a password!")
        }
        if (errorCode == "auth/invalid-email") {
          alert("Please provide a valid email format!")
        }
        if (errorCode == "auth/weak-password") {
          alert("Password should be at least 6 characters long!")
        }
        if (errorCode == "auth/email-already-in-use") {
          alert("Email is already in use! Please use another email.")
        }
      })
    }
  })
  if (userExists) {
    alert("Username is already taken! Please use another username.")
  }

})


