

var url = "./assets/recipesStorage.json"
axios.get(
url
)
.then(response =>  {
    console.log(response.data)
    var test1=response.data.recipes
    console.log(test1)
    var cuisineList=[]
   
    getCuisines(cuisineList,test1)
    console.log(cuisineList)
    
    //create carousel per cuisine
    for( u in cuisineList){}

    
   
   

})


function getCuisines(cuisineList,database){
    for(x in database){
        console.log(database[x].cuisine)
        cuisineList.push(database[x].cuisine)

    }
    
}

var testing=createCard("Fish","15 minutes","chickenrice")

function createCard(dishName,preptime,imglink){
//create card
var card=document.createElement("div")

//set card style
card.setAttribute("class","card")
card.style.width="18rem"

//create img
var img1=document.createElement("img")
img1.setAttribute("src","../images/"+imglink+".jpeg")
img1.setAttribute("class","card-img-top" )

//create class body
var body=document.createElement("div")
body.setAttribute("class","card-body")

//create card title, time to cook, clickable link
var title=document.createElement("h5")
title.setAttribute("class","card-title")
var textnode=document.createTextNode(dishName)
title.appendChild(textnode)

//cooking time
var cooktime=document.createElement("p")
var textnode2=document.createTextNode(preptime)
cooktime.appendChild(textnode2)

//clickable link

var link=document.createElement("a")
link.setAttribute("href","indiv_recipe.html?abcd='1'")
var textnode3=document.createTextNode(imglink)
link.appendChild(textnode3)

//add all tgt
body.append(title)
body.append(cooktime)
body.append(link)
card.append(img1)
card.append(body)
console.log(card)


var t1=document.getElementById("testing")
console.log(testing)
t1.append(card)
}
var t1=document.getElementById("testing")
console.log(t1)
