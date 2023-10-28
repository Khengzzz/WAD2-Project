

var url = "./assets/recipesStorage.json"
axios.get(
url
)
.then(response =>  {
    console.log(response.data)
    var test1=response.data
    console.log(typeof(test1))
    


    //get food categories and add it to list, show as dropdown
    var cuisineList=[]
    var foodCat=document.getElementsByClassName("foodCat")
    for(y in test1){
        
        cuisineList.push(test1[y])
        foodCat[y].append(test1[y].cuisine)
        console.log(test1[y].dishes)
    }
    // console.log(cuisineList)

   
   
}
)

