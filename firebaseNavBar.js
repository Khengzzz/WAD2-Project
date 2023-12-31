// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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

// Dynamic display elements
var dynamicDisplay1 = document.getElementById('display');
var dynamicDisplay2 = document.getElementById('display2');

// Detect auth state
onAuthStateChanged(auth, user => {
    // Check if user is logged in and display accordingly
    // Logged in display
    if (user) {
        // Clear the display
        dynamicDisplay1.innerHTML = "";
        dynamicDisplay2.innerHTML = "";

        // Current logged in user's uid
        var uid = user.uid;

        // Retrieve user's username
        const userProfile = ref(database, 'users/' + uid)
        //console.log(userProfile)
        onValue(userProfile, (snapshot) => {
            const userData = snapshot.val()
            //console.log(userData)
            if (dynamicDisplay1.innerHTML == "") {
                // Create h6 tag
                var h6Elem = document.createElement('h6');
                var h6textNode = document.createTextNode('Welcome, ' + userData.username + "!")
                h6Elem.appendChild(h6textNode);
                // Append to dynamicDisplay1 elem
                dynamicDisplay1.appendChild(h6Elem)
            }
        })
        // Populate the display
        // Create a 2 <a> elements linking to profile page and to logout respectively
        var profileAElem = document.createElement('a')
        profileAElem.href = "../userProfile/profilePage.html"
        profileAElem.style.marginRight = "10px"
        var profileText = document.createTextNode('Profile')

        var logoutAElem = document.createElement('a')
        var logoutText = document.createTextNode('Logout')

        // Set event listener to sign out user from firebase auth once they click logout
        logoutAElem.addEventListener('click', (e) => {
            signOut(auth)
            .then(() => {
                // Sign out successful
                const date = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_logged_out: date,
                }).then(function() {
                    alert('You have logged out successfully!');
                    location.replace("../index.html")
                })
            })
            .catch((error) => {
                alert(error.code)
            })
        })

        // Combining all elements and adding to dynamicDisplay2
        profileAElem.appendChild(profileText)
        logoutAElem.appendChild(logoutText)
        
        dynamicDisplay2.appendChild(profileAElem)
        dynamicDisplay2.appendChild(logoutAElem)

    // Not logged in display
    } else {
        // Clear the display
        dynamicDisplay1.innerHTML = "";
        dynamicDisplay2.innerHTML = "";
        // Populate the display

        // Create a 2 <a> elements linking to register.html and login.html respectively
        var registerAElem = document.createElement('a')
        registerAElem.href = "../register/register.html"
        registerAElem.style.marginRight = "10px"
        var registerText = document.createTextNode('Sign Up')

        var loginAElem = document.createElement('a')
        loginAElem.href = "../login/login.html"
        var loginText = document.createTextNode('Login')

        // Combining all elements and adding to dynamicDisplay1
        registerAElem.appendChild(registerText)
        loginAElem.appendChild(loginText)
        dynamicDisplay2.appendChild(registerAElem)
        dynamicDisplay2.appendChild(loginAElem)

    }
})



