
//pull from json file
var url = "recipesStorage.json"
axios.get(
url
)
.then(response =>  {
    console.log(response.data)
    var test1=response.data.recipes
    console.log(test1)
    var cuisineList=[]
   
    getCuisines(cuisineList,test1)
    //get div to hold everything inside
    var overall=document.getElementById("main")
    console.log(cuisineList)

    //get cuisine name as 1st div, 2nd div as dishes in cuisine
    for(u in cuisineList){

        //create cuisine name div
        var cuisineNameHolder=document.createElement("div")
        cuisineNameHolder.setAttribute("class","row text-center spacing")
        var cuisineName=document.createElement("h2")
        var textnode=document.createTextNode(cuisineList[u])
        cuisineName.append(textnode)
        cuisineNameHolder.append(cuisineName)
        console.log(cuisineNameHolder)


        //get array of dishes for the current cuisine
        var disheslist=test1[u].dishes
        
        //set divId
        var divId="a"+u
        

        //create div to hold cards
        var divEle=document.createElement("div")
        divEle.setAttribute("id",divId)
        divEle.setAttribute("class","row justify-content-center spacing")


        for(i in disheslist){
            //get name of dish
           dishname=disheslist[i].name
           console.log(dishname)
            dishtime=disheslist[i].time
            dishImg=disheslist[i].img
            var papertrail=createCard(dishname,dishtime,dishImg,divEle,cuisineList[u])
            
            // console.log(dishname+" "+dishtime +" "+ dishImg+" " +"abd")
        }

     //add div with card to overall
        overall.append(cuisineNameHolder)
       overall.append(papertrail)
        console.log("end")
    }

 
    
   
   

})


function getCuisines(cuisineList,database){
    for(x in database){
       
        cuisineList.push(database[x].cuisine)

    }
    
}


function createCard(dishName,preptime,imglink,divId,cName){
    //create card
    var card=document.createElement("div")

    //set card style
    card.setAttribute("class","card")
    card.style.width="15rem"

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

    //button

    var link=document.createElement("a")
    link.setAttribute("href","indiv_recipe.html?cuisine="+cName+"&dish="+imglink)
    var textnode3=document.createTextNode("Click here to view dish")
    link.appendChild(textnode3)

    //add all tgt
    body.append(title)
    body.append(cooktime)
    body.append(link)
    card.append(img1)
    card.append(body)




    //appendcard to div
    divId.append(card)


    return divId

}

