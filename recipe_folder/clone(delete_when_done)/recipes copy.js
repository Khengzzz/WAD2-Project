

var url = "./assets/recipesStorage.json"
axios.get(
url
)
.then(response =>  {
    console.log(response.data)
    var test1=response.data.recipes
    console.log(test1)
    var cuisineList=[]
    getFoodCategory(cuisineList,test1)
    
    //fill out indiv card

    //create card


    
   
   
}
)


//get food categories and add it to list, show as dropdown
function getFoodCategory(abc,test1){
    var foodCat=document.getElementsByClassName("foodCat")
    for(y in test1){
    
        abc.push(test1[y])
        foodCat[y].append(test1[y].cuisine)
        //get holding carousel
        var holder=document.getElementById("cuisine1")
        
       //
        
 
        for(x in test1[y].dishes){
            
            console.log("cuisine is"+y)
            // console.log( test1[y].dishes[x])
            var foodRep=test1[y].dishes[x]
        

        }
        //throw everything into the carousel

        
    }


   
    
    }

function fillItemCard(foodList,owlcarou){
    var name1=foodList.name
    var imglink=foodList.img
    var preptime=foodList.time

    //itemcard
   var foodcard=document.createElement("div")
   foodcard.setAttribute("class","item")

   var foodLink=document.createElement("a")
   foodLink.setAttribute("onclick","getObj()")
    foodLink.setAttribute("href","./indiv_recipe.html")
   
    //throw this everything here into foodlink
    var portfolio=document.createElement("div")
    portfolio.setAttribute("class","portfolio-item")

            //add everything here into portfolio
            var p1=document.createElement("div")
            p1.setAttribute("class","thumb")
                //throw img into p1
                var pimg=document.createElement("img")
                pimg.setAttribute("src","../images/"+imglink+".jpeg")
                p1.append(pimg)

            var p2=document.createElement("div")
            p2.setAttribute("class","down-content")
            
                //throw everything here into p2
                var txt=document.createElement("h5")
                txt.append(name1)
                var timeSpan= document.createElement("span")
                timeSpan.append(preptime)
                p2.append(txt)
                p2.append(timeSpan)
            

            portfolio.append(p1)
            portfolio.append(p2)
            foodLink.append(portfolio)
            foodcard.append(foodLink)
            owlcarou.append(foodcard)
            console.log(name1+" "+imglink+" "+preptime)

            
}

function itemFiller(cuisineType,array){
    
}


function getObj(){
  console.log(this)
}

