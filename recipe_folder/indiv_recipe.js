

const urlParams = new URLSearchParams(window.location.search);
var cuisine= urlParams.get('cuisine');
console.log(cuisine)

var dish = urlParams.get('dish');
console.log(dish)


//call from json file
var url = "./assets/recipesStorage.json"
axios.get(
url
)
.then(response =>  {
    var recipeList=response.data.recipes
    
    var cuisineArr=[]
    var actualDish=""
    //get array of cuisine and narrow down to dishlist

    cuisineArr=getCuisine(recipeList,cuisine)


    //get exact dish obj and extract it
    actualDish=getDish(cuisineArr,dish)
    console.log(actualDish)

    //get ingredientList and add li
    var ingredientList=actualDish.ingredients
    console.log(ingredientList)

    //get instructions
    var instruction=actualDish.instructions
    console.log(instruction)

    //get Name
    var name=actualDish.name
    console.log(name)

    //get serve
    var serve=actualDish.serves
    console.log(serve)

    //get img
    var imglink=actualDish.img
    console.log(imglink)

    //get time
    var time=actualDish.time
    
    //populate food cat,name
    filltop(cuisine,name)


    //populate time, servings

    fillTimeAndServe(time,serve)


   //populate instructions
   fillInstruction(instruction)

   //fill ingredients
   fillIngredients(ingredientList)
})

function getCuisine(input,selectedCuisine){
    var output=[]
    for(x in input){
        
        if(input[x].cuisine===selectedCuisine){
            console.log("yay")
          output=input[x].dishes
          return output
        }
    }
    
}

function getDish(input,dish){

    for(y in input){
        
        if(input[y].img===dish){
      
            return input[y]
           
        }
    }
}

function filltop(a,b){
     //populate name
     var name1=document.getElementById("name")
     name1.innerHTML=b
 
     //populate foodcategory
     var foodcat=document.getElementById("cat")
     foodcat.innerHTML=a
}

function fillingredient(){

}

function fillTimeAndServe(a,b){
    var prep=document.getElementById("prep")
    console.log(a)
    prep.innerHTML=a

    var serving=document.getElementById("serve")
    serving.innerHTML=b+" people "
}

function fillInstruction(ins){
    var ingre=document.getElementById("ingredientList")


    for(x in ins){
        liItem=document.createElement('li')
        liItem.append(ins[x])
        ingre.append(liItem)
    }
}

function fillIngredients(ingredientList){

    console.log("abcd "+ ingredientList)
    
    //get ingredientList div
    ingredientDiv=document.getElementById("ingredients")


    for(a in ingredientList){
       console.log(ingredientList[a])
        var splitarr=ingredientList[a].split(" ")
        var paper=splitarr.join("_")
        console.log(paper)

    
        //create div
        var formClass=document.createElement("div")
        formClass.setAttribute("class","form-check form-check-rounded recipe-checkbox")

        //create input label and id
        var inputVal=document.createElement("input")
        inputVal.setAttribute("type","checkbox")
        inputVal.setAttribute("class","form-check-input")
        inputVal.setAttribute("id",paper)
        console.log(inputVal)

        //create label
        var labelItem=document.createElement("label")
        labelItem.setAttribute("class","form-check-label")
        labelItem.setAttribute("for",paper)
        labelItem.innerHTML=ingredientList[a]
        console.log(labelItem)

        //join all tgt
        formClass.append(inputVal)
        formClass.append(labelItem)

        ingredientDiv.append(formClass)
        }
    


}

{/* <div class="form-check form-check-rounded recipe-checkbox">
<input type="checkbox" id="cracker"name="crackers" class="form-check-input">
<label class="form-check-label" for="cracker">400g graham crackers  </label>
</div> */}