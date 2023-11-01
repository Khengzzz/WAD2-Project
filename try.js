

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
        var holder=document.getElementsByClassName("nacc")[0]
        
       //add each carousel li item
        var cuisinecard=document.createElement("li")
        if(y==0){
            cuisinecard.setAttribute("class","active")
            console.log(cuisinecard)
                    }
        //thumb
        var d1=document.createElement("div")
        d1.setAttribute("class","thumb")

        //row1
        var d2=document.createElement("div")
        d2.setAttribute("class","row")
        //center
        var d3=document.createElement("div")
        d3.setAttribute("class","align-self-center")
        
        //row2
        var d4=document.createElement("div")
        d4.setAttribute("class","row")
        //col
        var d5=document.createElement("div")
        d5.setAttribute("class","col-lg-12")

        //owl carou
        var d6=document.createElement("div")
        d6.setAttribute("class","loop owl-carousel")
        
 
        for(x in test1[y].dishes){
            
            console.log("cuisine is"+y)
            // console.log( test1[y].dishes[x])
            var foodRep=test1[y].dishes[x]
            fillItemCard(foodRep,d6)

        }
        //throw everything into the carousel
        d5.append(d6)
        d4.append(d5)
        d3.append(d4)
        d2.append(d3)
        d1.append(d2)
        cuisinecard.append(d1)
        holder.append(cuisinecard)
        console.log(holder)
        
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

function getObj(){
  console.log(this)
}

