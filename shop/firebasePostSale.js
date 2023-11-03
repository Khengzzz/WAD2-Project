// Import the functions you need from the SDKs you need
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
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

var cloudinary_url = "https://api.cloudinary.com/v1_1/dspndyx8k/upload"
var cloudinary_upload_preset = 'lx3a4q6l'

var saleType = document.getElementById('inputSaleType')
var saleLocation = document.getElementById('inputLocation')
var saleContact = document.getElementById('inputContactNo')
var salePrice = document.getElementById('inputSalePrice')
var saleDescription = document.getElementById('inputSaleDescription')
var salePeriod = document.getElementById('inputSalePeriod')

var saleImage = document.getElementById('file-upload');
var saleSecureUrl = ''
var latVal;
var lngVal;
var axiosDone = false;

// Upload and retrieve image using cloudinary api
saleImage.addEventListener('change', function(event) {
    var file = event.target.files[0];
    var formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', cloudinary_upload_preset)

    axios({
        url: cloudinary_url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(response => {
        var imgLink = response.data.secure_url
        saleSecureUrl = imgLink
    }).catch(error => {
        console.log(error.message)
    })
})

// Submit Post
btnPost.addEventListener('click', (e) => {
    var saleTypeValue = saleType.value.toLowerCase()
    if (saleTypeValue == "food chains") {
        saleTypeValue = saleTypeValue.split(" ").join("")
    }
    var saleLocationValue = saleLocation.value
    console.log(saleLocationValue)
    var saleContactValue = saleContact.value
    var salePriceValue = salePrice.value
    var saleDescriptionValue = saleDescription.value
    var salePeriodValue = salePeriod.value
    var saleSecureUrlValue = saleSecureUrl

    var myApiKey = "AIzaSyAy3roqtg4LWKDferNRiTMpiki8E2tsTas"
    var encodedAddr = encodeURI(saleLocationValue);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddr + "&key=" + myApiKey;

    const dateObj = new Date();

    let year = dateObj.getFullYear();

    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    // To make sure the month always has 2-character-format. For example, 1 => 01, 2 => 02

    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    // To make sure the date always has 2-character-format

    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    // To make sure the hour always has 2-character-format

    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    // To make sure the minute always has 2-character-format

    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
    // To make sure the second always has 2-character-format

    const time = `${year}/${month}/${date} ${hour}:${minute}:${second}`;

    // Error message variable
    var error = "";

    // Validate to ensure all fields are populated
    if (saleTypeValue == '' || saleLocationValue == '' || saleContactValue == '' || salePriceValue == '' || saleDescriptionValue == '' || salePeriodValue == '' || saleSecureUrlValue == '') {
        error += "One or more input fields are empty! \n";
    }
    // Ensure userinput for sale location is valid according to the specified format
    if (saleLocationValue) {
        // Conduct an axios call using user input of saleLocation, if empty array
        // if empty array returned = invalid location and throw error
        axios.get(url, {

        }).then(response => {
            axiosDone = true;
            console.log(response.data)
            console.log(response.data.results)
            if (response.data.results.length == 0) {
/*                 error += 'Please specify a proper location according to the format specified! \n'; */
                alert("Please specify a proper location according to the format specified!")
                axiosDone = false;
            }
            else {
                latVal = Number(response.data.results[0].geometry.location.lat);
                lngVal = Number(response.data.results[0].geometry.location.lng);
            }
        })
    }
    // Phone number must be exactly 8 digits long, and start with 6,8 or 9
    if (saleContactValue.length != 8 || (saleContactValue[0] != '6' && saleContactValue[0] != '8' && saleContactValue[0] != '9')) {
        error += 'Contact number format is invalid! Ensure format is exactly 8 digits, and must start with 6,8 or 9! \n'
    }
    // If there are any errors, print all of them into one alert box
    if (error != "") {
        alert(error);
    }
    // Passed all validation checks, input into database
    else {
        if (latVal !== undefined && lngVal !== undefined && axiosDone === true) {
            set(ref(database, 'saleposts/' + saleTypeValue + '/' + saleLocationValue.toUpperCase()), {
                location: saleLocationValue.toUpperCase(),
                contactno: saleContactValue,
                discountedprice: salePriceValue,
                salesdescription: saleDescriptionValue,
                salesperiod: salePeriodValue,
                saleimage: saleSecureUrlValue,
                postedon: time,
                lat: latVal,
                lng: lngVal, 
            }).then(function() {
                alert("Your post has been successfully submitted!")
                location.replace("shop.html")
            })
        }
    }
})





