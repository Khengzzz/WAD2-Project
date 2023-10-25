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
var contentDisplay = document.getElementById('display');
var btnCommunity = document.getElementById('btnCommunity')
var btnFoodChain = document.getElementById('btnShops')
var btnSupermarket = document.getElementById('btnSupermarkets')

// Retrieve user's username
const postedSales = ref(database, 'saleposts/')


// When page is first loaded, display all sale posts
onValue(postedSales, (snapshot) => {
    const allSalesData = snapshot.val()

    for (let saletype in allSalesData) {
        const selectedSaleType = ref(database, 'saleposts/' + saletype)
        onValue(selectedSaleType, (snapshot) => {
            const selectedSaleTypeData = snapshot.val()
            for (let sale in selectedSaleTypeData) {
                const selectedSale = ref(database, 'saleposts/' + saletype + '/' + sale)
                onValue(selectedSale, (snapshot) => {
                    const selectedSalesData = snapshot.val()
                    // Card div
                    var cardDiv = document.createElement('div')
                    cardDiv.classList.add('card')

                    // Card Header Div
                    var cardHeaderDiv = document.createElement('div')
                    cardHeaderDiv.classList.add('card-header')
                    var cardHeaderText = document.createTextNode(selectedSalesData.postedon)
                    cardHeaderDiv.appendChild(cardHeaderText)

                    // Card Body Div
                    var cardBodyDiv = document.createElement('div')
                    cardBodyDiv.classList.add('card-body')

                    // H5 tag Card title
                    var shopNameElem = document.createElement('h5')
                    shopNameElem.classList.add('card-title')
                    var shopNameText = document.createTextNode(sale)
                    shopNameElem.appendChild(shopNameText)

                    // P tag contactnumber
                    var contactNoElem = document.createElement('p')
                    contactNoElem.classList.add('card-text')
                    var contactNoText = document.createTextNode("Contact Number: " + selectedSalesData.contactno)
                    contactNoElem.appendChild(contactNoText)
                    // P tag salesdesc
                    var salesDescElem = document.createElement('p')
                    salesDescElem.classList.add('card-text')
                    var salesDescText = document.createTextNode("Sales Information: " + selectedSalesData.salesdescription)
                    salesDescElem.appendChild(salesDescText)
                    // P tag salesperiod
                    var salesPeriodElem = document.createElement('p')
                    salesPeriodElem.classList.add('card-text')
                    var salesPeriodText = document.createTextNode("Sales Period: " + selectedSalesData.salesperiod)
                    salesPeriodElem.appendChild(salesPeriodText)
                    // P tag discountedprice
                    var discountedPriceElem = document.createElement('p')
                    discountedPriceElem.classList.add('card-text')
                    var discountedPriceText = document.createTextNode("Discounts: " + selectedSalesData.discountedprice)
                    discountedPriceElem.appendChild(discountedPriceText)

                    // Button Locate
                    var locateAElem = document.createElement('a')
                    locateAElem.classList.add('btn')
                    locateAElem.classList.add('btn-primary')
                    var locateAText = document.createTextNode('Find Location')
                    locateAElem.appendChild(locateAText)

                    // Add event listener to go maps page and send location name over to map
                    locateAElem.addEventListener('click', (e) => {
                        localStorage.setItem('location', sale);
                        location.href = "map.html";
                    })

                    cardBodyDiv.appendChild(shopNameElem)
                    cardBodyDiv.appendChild(contactNoElem)
                    cardBodyDiv.appendChild(salesDescElem)
                    cardBodyDiv.appendChild(salesPeriodElem)
                    cardBodyDiv.appendChild(discountedPriceElem)
                    cardBodyDiv.appendChild(locateAElem)

                    cardDiv.appendChild(cardHeaderDiv)
                    cardDiv.appendChild(cardBodyDiv)
                    contentDisplay.appendChild(cardDiv)
                })
            }

        })
    }
})

// When clicked, filter by community sale posts
btnCommunity.addEventListener('click', (e) => {
    var btnValue = btnCommunity.value;
    contentDisplay.innerHTML = ""
    const selectedSaleType = ref(database, 'saleposts/' + btnValue)
    onValue(selectedSaleType, (snapshot) => {
        const selectedSaleTypeData = snapshot.val()
        for (let sale in selectedSaleTypeData) {
            const selectedSale = ref(database, 'saleposts/' + btnValue + '/' + sale)
            onValue(selectedSale, (snapshot) => {
                const selectedSalesData = snapshot.val()
                // Card div
                var cardDiv = document.createElement('div')
                cardDiv.classList.add('card')

                // Card Header Div
                var cardHeaderDiv = document.createElement('div')
                cardHeaderDiv.classList.add('card-header')
                var cardHeaderText = document.createTextNode(selectedSalesData.postedon)
                cardHeaderDiv.appendChild(cardHeaderText)

                // Card Body Div
                var cardBodyDiv = document.createElement('div')
                cardBodyDiv.classList.add('card-body')

                // H5 tag Card title
                var shopNameElem = document.createElement('h5')
                shopNameElem.classList.add('card-title')
                var shopNameText = document.createTextNode(sale)
                shopNameElem.appendChild(shopNameText)

                // P tag contactnumber
                var contactNoElem = document.createElement('p')
                contactNoElem.classList.add('card-text')
                var contactNoText = document.createTextNode("Contact Number: " + selectedSalesData.contactno)
                contactNoElem.appendChild(contactNoText)
                // P tag salesdesc
                var salesDescElem = document.createElement('p')
                salesDescElem.classList.add('card-text')
                var salesDescText = document.createTextNode("Sales Information: " + selectedSalesData.salesdescription)
                salesDescElem.appendChild(salesDescText)
                // P tag salesperiod
                var salesPeriodElem = document.createElement('p')
                salesPeriodElem.classList.add('card-text')
                var salesPeriodText = document.createTextNode("Sales Period: " + selectedSalesData.salesperiod)
                salesPeriodElem.appendChild(salesPeriodText)
                // P tag discountedprice
                var discountedPriceElem = document.createElement('p')
                discountedPriceElem.classList.add('card-text')
                var discountedPriceText = document.createTextNode("Discounts: " + selectedSalesData.discountedprice)
                discountedPriceElem.appendChild(discountedPriceText)
                
                // Button Locate
                var locateAElem = document.createElement('a')
                locateAElem.classList.add('btn')
                locateAElem.classList.add('btn-primary')
                var locateAText = document.createTextNode('Find Location')
                locateAElem.appendChild(locateAText)

                // Add event listener to go maps page and send location name over to map
                locateAElem.addEventListener('click', (e) => {
                    localStorage.setItem('location', sale);
                    location.href = "map.html";
                })

                cardBodyDiv.appendChild(shopNameElem)
                cardBodyDiv.appendChild(contactNoElem)
                cardBodyDiv.appendChild(salesDescElem)
                cardBodyDiv.appendChild(salesPeriodElem)
                cardBodyDiv.appendChild(discountedPriceElem)
                cardBodyDiv.appendChild(locateAElem)

                cardDiv.appendChild(cardHeaderDiv)
                cardDiv.appendChild(cardBodyDiv)
                contentDisplay.appendChild(cardDiv)
            })
        }
    })
})

// When clicked, filter by food chain sale posts
btnFoodChain.addEventListener('click', (e) => {
    var btnValue = btnFoodChain.value;
    contentDisplay.innerHTML = ""
    const selectedSaleType = ref(database, 'saleposts/' + btnValue)
    onValue(selectedSaleType, (snapshot) => {
        const selectedSaleTypeData = snapshot.val()
        for (let sale in selectedSaleTypeData) {
            const selectedSale = ref(database, 'saleposts/' + btnValue + '/' + sale)
            onValue(selectedSale, (snapshot) => {
                const selectedSalesData = snapshot.val()
                // Card div
                var cardDiv = document.createElement('div')
                cardDiv.classList.add('card')

                // Card Header Div
                var cardHeaderDiv = document.createElement('div')
                cardHeaderDiv.classList.add('card-header')
                var cardHeaderText = document.createTextNode(selectedSalesData.postedon)
                cardHeaderDiv.appendChild(cardHeaderText)

                // Card Body Div
                var cardBodyDiv = document.createElement('div')
                cardBodyDiv.classList.add('card-body')

                // H5 tag Card title
                var shopNameElem = document.createElement('h5')
                shopNameElem.classList.add('card-title')
                var shopNameText = document.createTextNode(sale)
                shopNameElem.appendChild(shopNameText)

                // P tag contactnumber
                var contactNoElem = document.createElement('p')
                contactNoElem.classList.add('card-text')
                var contactNoText = document.createTextNode("Contact Number: " + selectedSalesData.contactno)
                contactNoElem.appendChild(contactNoText)
                // P tag salesdesc
                var salesDescElem = document.createElement('p')
                salesDescElem.classList.add('card-text')
                var salesDescText = document.createTextNode("Sales Information: " + selectedSalesData.salesdescription)
                salesDescElem.appendChild(salesDescText)
                // P tag salesperiod
                var salesPeriodElem = document.createElement('p')
                salesPeriodElem.classList.add('card-text')
                var salesPeriodText = document.createTextNode("Sales Period: " + selectedSalesData.salesperiod)
                salesPeriodElem.appendChild(salesPeriodText)
                // P tag discountedprice
                var discountedPriceElem = document.createElement('p')
                discountedPriceElem.classList.add('card-text')
                var discountedPriceText = document.createTextNode("Discounts: " + selectedSalesData.discountedprice)
                discountedPriceElem.appendChild(discountedPriceText)
                
                // Button Locate
                var locateAElem = document.createElement('a')
                locateAElem.classList.add('btn')
                locateAElem.classList.add('btn-primary')
                var locateAText = document.createTextNode('Find Location')
                locateAElem.appendChild(locateAText)

                // Add event listener to go maps page and send location name over to map
                locateAElem.addEventListener('click', (e) => {
                    localStorage.setItem('location', sale);
                    location.href = "map.html";
                })

                cardBodyDiv.appendChild(shopNameElem)
                cardBodyDiv.appendChild(contactNoElem)
                cardBodyDiv.appendChild(salesDescElem)
                cardBodyDiv.appendChild(salesPeriodElem)
                cardBodyDiv.appendChild(discountedPriceElem)
                cardBodyDiv.appendChild(locateAElem)

                cardDiv.appendChild(cardHeaderDiv)
                cardDiv.appendChild(cardBodyDiv)
                contentDisplay.appendChild(cardDiv)
            })
        }
    })
})

// When clicked, filter by supermarket sale posts
btnSupermarket.addEventListener('click', (e) => {
    var btnValue = btnSupermarket.value;
    contentDisplay.innerHTML = ""
    const selectedSaleType = ref(database, 'saleposts/' + btnValue)
    onValue(selectedSaleType, (snapshot) => {
        const selectedSaleTypeData = snapshot.val()
        for (let sale in selectedSaleTypeData) {
            const selectedSale = ref(database, 'saleposts/' + btnValue + '/' + sale)
            onValue(selectedSale, (snapshot) => {
                const selectedSalesData = snapshot.val()
                // Card div
                var cardDiv = document.createElement('div')
                cardDiv.classList.add('card')

                // Card Header Div
                var cardHeaderDiv = document.createElement('div')
                cardHeaderDiv.classList.add('card-header')
                var cardHeaderText = document.createTextNode(selectedSalesData.postedon)
                cardHeaderDiv.appendChild(cardHeaderText)

                // Card Body Div
                var cardBodyDiv = document.createElement('div')
                cardBodyDiv.classList.add('card-body')

                // H5 tag Card title
                var shopNameElem = document.createElement('h5')
                shopNameElem.classList.add('card-title')
                var shopNameText = document.createTextNode(sale)
                shopNameElem.appendChild(shopNameText)

                // P tag contactnumber
                var contactNoElem = document.createElement('p')
                contactNoElem.classList.add('card-text')
                var contactNoText = document.createTextNode("Contact Number: " + selectedSalesData.contactno)
                contactNoElem.appendChild(contactNoText)
                // P tag salesdesc
                var salesDescElem = document.createElement('p')
                salesDescElem.classList.add('card-text')
                var salesDescText = document.createTextNode("Sales Information: " + selectedSalesData.salesdescription)
                salesDescElem.appendChild(salesDescText)
                // P tag salesperiod
                var salesPeriodElem = document.createElement('p')
                salesPeriodElem.classList.add('card-text')
                var salesPeriodText = document.createTextNode("Sales Period: " + selectedSalesData.salesperiod)
                salesPeriodElem.appendChild(salesPeriodText)
                // P tag discountedprice
                var discountedPriceElem = document.createElement('p')
                discountedPriceElem.classList.add('card-text')
                var discountedPriceText = document.createTextNode("Discounts: " + selectedSalesData.discountedprice)
                discountedPriceElem.appendChild(discountedPriceText)
                
                // Button Locate
                var locateAElem = document.createElement('a')
                locateAElem.classList.add('btn')
                locateAElem.classList.add('btn-primary')
                var locateAText = document.createTextNode('Find Location')
                locateAElem.appendChild(locateAText)

                // Add event listener to go maps page and send location name over to map
                locateAElem.addEventListener('click', (e) => {
                    localStorage.setItem('location', sale);
                    location.href = "map.html";
                })

                cardBodyDiv.appendChild(shopNameElem)
                cardBodyDiv.appendChild(contactNoElem)
                cardBodyDiv.appendChild(salesDescElem)
                cardBodyDiv.appendChild(salesPeriodElem)
                cardBodyDiv.appendChild(discountedPriceElem)
                cardBodyDiv.appendChild(locateAElem)

                cardDiv.appendChild(cardHeaderDiv)
                cardDiv.appendChild(cardBodyDiv)
                contentDisplay.appendChild(cardDiv)
            })
        }
    })
})



