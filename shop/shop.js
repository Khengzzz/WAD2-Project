// shop.js

// Retrieve the Firebase app and database modules
import firebase from 'firebase/app';
import 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQuYzHV8SGG_Mr_kKCEZXeqGUwixIhX1s",
    authDomain: "ecobites-b5084.firebaseapp.com",
    databaseURL: "https://ecobites-b5084-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecobites-b5084",
    storageBucket: "ecobites-b5084.appspot.com",
    messagingSenderId: "256057404957",
    appId: "1:256057404957:web:deecd1dfbcb5f83e1460f4",
    measurementId: "G-GZ4EDQDHRT"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Create a reference to the 'community' node under 'saleposts'
const dbRef = firebase.database().ref('saleposts/community');

// Initialize Vue
import Vue from 'vue';

// Create a Vue app
const app = Vue.createApp({
  data() {
    return {
      data: []
    };
  },
  created() {
    // Fetch data from the Firebase database
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const dataArray = [];
      for (let key in data) {
        dataArray.push(data[key]);
      }
      this.data = dataArray;
    });
  }
});

// Mount the app to the element with the ID 'app'
app.mount('#app');
