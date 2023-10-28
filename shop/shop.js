// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const config = {
  apiKey: "AIzaSyDQuYzHV8SGG_Mr_kKCEZXeqGUwixIhX1s",
  authDomain: "ecobites-b5084.firebaseapp.com",
  databaseURL: "https://ecobites-b5084-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecobites-b5084",
  storageBucket: "ecobites-b5084.appspot.com",
  messagingSenderId: "256057404957",
  appId: "1:256057404957:web:deecd1dfbcb5f83e1460f4",
  measurementId: "G-GZ4EDQDHRT"
};

firebase.initializeApp(config);
const database = firebase.database();
const dbRef = database.ref('saleposts/community');

new Vue({
  el: "#app",
  data() {
    return {
      data: []
    };
  },
  created() {
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const dataArray = [];
      for (let key in data) {
        dataArray.push(data[key]);
      }
      this.data = dataArray;
      console.log(this.data);
    });
  }
});
