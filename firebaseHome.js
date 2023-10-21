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
var dynamicDisplay = document.getElementById('userDisplay');

// Detect auth state
onAuthStateChanged(auth, user => {
    // Check if user is logged in and display accordingly
    // Logged in display
    if (user) {
        var uid = user.uid;
        // Retrieve user's username
        const userProfile = ref(database, 'users/' + uid)
        onValue(userProfile, (snapshot) => {
            const userData = snapshot.val()
            // Create label tag
            var labelElem = document.createElement('label');
            var textNode = document.createTextNode('Welcome ' + userData.username)
            labelElem.appendChild(textNode);
            // Append to <a> elem
            aElem.appendChild(labelElem)
        })
        // Clear the display
        dynamicDisplay.innerHTML = "";
        // Populate the display
        // Create <a> tag Elem
        var aElem = document.createElement('a')
        aElem.classList.add('nav-link')
        aElem.classList.add('dropdown-toggle')
        aElem.classList.add('me-5')
        aElem.role = 'button'
        aElem.setAttribute('data-bs-toggle', 'dropdown')
        aElem.setAttribute('aria-expanded', 'false')

        // Create account img
        var imgElem = document.createElement('img');
        imgElem.src = "images/usericon.png"
        imgElem.style.width = "30px";

        // Create dropdownlist with Profile and Logout list elements
        var ulElem = document.createElement('ul')
        ulElem.setAttribute('id', 'txtchange')
        ulElem.classList.add("dropdown-menu");
        var profileLiElem = document.createElement("li")
        profileLiElem.classList.add("pinkbg")
        var logoutLiElem = document.createElement("li")
        logoutLiElem.classList.add("pinkbg")
        var profileAElem = document.createElement('a')
        var logoutAElem = document.createElement('a')
        profileAElem.classList.add('dropdown-item');
        profileAElem.href = "userProfile/profilePage.html"
        logoutAElem.classList.add('dropdown-item');
        var profileAElemText = document.createTextNode('Profile')
        var logoutAElemText = document.createTextNode('Logout')
        profileAElem.appendChild(profileAElemText)
        logoutAElem.appendChild(logoutAElemText)

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
                })
            })
            .catch((error) => {
                alert(error.code)
            })
        })
        // Combining all elements and adding to dynamicDisplay elem
        profileLiElem.appendChild(profileAElem)
        logoutLiElem.appendChild(logoutAElem)
        ulElem.appendChild(profileLiElem)
        ulElem.appendChild(logoutLiElem)
        aElem.appendChild(imgElem)
        dynamicDisplay.appendChild(aElem)
        dynamicDisplay.appendChild(ulElem)

    // Not logged in display
    } else {
        // Clear the display
        dynamicDisplay.innerHTML = "";
        // Populate the display

        // Create a ul element to store 2 link list elements
        var ulElem = document.createElement('ul')
        ulElem.classList.add("navbar-nav")
        ulElem.classList.add("mb-2")
        ulElem.classList.add("mb-lg-0")

        // Create Sign Up and Login list link elements
        var registerLiElem = document.createElement('li')
        registerLiElem.classList.add('nav-item')
        var loginLiElem = document.createElement('li')
        loginLiElem.classList.add('nav-item')
        var registerAElem = document.createElement('a')
        registerAElem.classList.add("nav-link")
        registerAElem.href = "account/register.html"
        var registerText = document.createTextNode('Sign Up')
        registerAElem.appendChild(registerText)
        registerLiElem.appendChild(registerAElem)
        var loginAElem = document.createElement('a')
        loginAElem.classList.add("nav-link")
        loginAElem.href = "account/login.html"
        var loginText = document.createTextNode('Login')

        // Combining all elements and adding to dynamicDisplay elem
        loginAElem.appendChild(loginText)
        loginLiElem.appendChild(loginAElem)
        ulElem.appendChild(registerLiElem)
        ulElem.appendChild(loginLiElem)
        dynamicDisplay.appendChild(ulElem)

    }
})



