
// Taken from https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getDatabase, ref, update,get,child } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use


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

//cloudinary stuff
var cloudinary_url = "https://api.cloudinary.com/v1_1/dspndyx8k/upload"
var cloudinary_upload_preset = 'lx3a4q6l' 
var saleImage = document.getElementById('file-upload');

//secureUrl
var userImgUrl=''

//check user signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
     

      const dbRef = ref(getDatabase());
        
   
      const displayName = user.displayName;
      const email = user.email;
      var uid=user.uid
      console.log(user.uid)
      console.log(email)


      var usernameDiv=document.getElementById("username")
      var emailDiv=document.getElementById("email")

      //get uid
      get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
        
        var userValues=snapshot.val()
        var userh=document.createElement("h5")
        userh.append("Username: "+userValues.username)
        usernameDiv.append(userh)
        
        // email div
        var emailh=document.createElement("h5")
        emailh.append("Email: "+userValues.email)
        emailDiv.append(emailh)
         
        //get userprofile img id
        var imgid=document.getElementById("profileImg")
        var currentUserImg=userValues.profileImg
        // If user currently has a profile picture, replaces default profile picture with user's current profile picture
        if (currentUserImg != "") {
          imgid.setAttribute("src",currentUserImg)
        }
            //create upload
            
            console.log(saleImage)
            saleImage.addEventListener('change', function(event) {
              var file = event.target.files[0];
              var formData = new FormData()
              formData.append('file', file)
              formData.append('upload_preset', cloudinary_upload_preset)
              console.log(formData)
    

            axios({
                url: cloudinary_url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then(response => {
                var imgLink = response.data.secure_url
                userImgUrl = imgLink
                imgid.src=imgLink
                console.log(userImgUrl)
            }).catch(error => {
                console.log(error.message)
            })




        })} else {
          console.log("No data available");
        }})


        // Update/Save Changes button
        var btnUpdate=document.getElementById("update")
        btnUpdate.addEventListener("click",(e)=>{
          var newImgUrl=userImgUrl
          console.log(newImgUrl)
          // Condition prevents user from saving until image has been fully uploaded to cloudinary
          if (newImgUrl != "") {
            update(ref(database,"users/"+uid),{
              profileImg:newImgUrl
            })
            .then(function(){
              alert("Profile changes have been updated!")
            })
          }

        })
    } else {
      alert("You are not logged in!")
      location.replace("../homepage final/index.html")
    }
  });