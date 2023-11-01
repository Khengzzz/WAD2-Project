var url = "./assets/recipesStorage.json";
axios.get(url)
  .then(response => {
    var test1 = response.data.recipes;
    var cuisineList = [];
    getCuisines(cuisineList, test1);
    console.log(cuisineList)


    //get cuisines list
    for (u in cuisineList) {
      console.log("Processing cuisine:", cuisineList[u]);

      var cuisineNameHolder = document.createElement("div");
      cuisineNameHolder.setAttribute("class", "row text-center spacing");
      var cuisineName = document.createElement("h2");
      var textnode = document.createTextNode(cuisineList[u]);
      cuisineName.appendChild(textnode);
      cuisineNameHolder.appendChild(cuisineName);


      var currentCuisine = test1.find(item => item.cuisine === cuisineList[u]);
      

      var disheslist = currentCuisine.dishes;
      //set div id to lower case
      var divId = cuisineList[u].toLowerCase(); 
      
      
      var divEle = document.getElementById(divId); 
      console.log("Current divEle:", divEle);

      if (!divEle) {
        divEle = document.createElement("div"); 
        divEle.setAttribute("id", divId);
        divEle.setAttribute("class", "row justify-content-center spacing");
      }

      for (i in disheslist) {
        var dishname = disheslist[i].name;
        var dishtime = disheslist[i].time;
        var dishImg = disheslist[i].img;
        createCard(dishname, dishtime, dishImg, divEle, cuisineList[u]);
      }

    }
  });

function getCuisines(cuisineList, database) {
  for (x in database) {
    
    cuisineList.push(database[x].cuisine);
  }
}

function createCard(dishName, preptime, imglink, divId, cName) {
  //create card div
  var card = document.createElement("div");
  card.setAttribute("class", "card ");
  card.style.width = "18rem";
  card.style.display = "inline-block";
  card.style.padding = "10px";
  card.style.margin = "15px";
  card.style.borderRadius = "10%"

  //set img
  var img1 = document.createElement("img");
  img1.setAttribute("src", "../images/foodImgs/" + imglink + ".jpeg");
  img1.setAttribute("class", "card-img-top");
  img1.setAttribute("height", "200px");
  img1.setAttribute("width", "200px");

  //create text body and fill it
  var body = document.createElement("div");
  body.setAttribute("class", "card-body");
  var title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  var textnode = document.createTextNode(dishName);
  title.appendChild(textnode);

  //create cook timing and add text
  var cooktime = document.createElement("p");
  var textnode2 = document.createTextNode(preptime);
  cooktime.appendChild(textnode2);

  //create clickable link
  var link = document.createElement("a");
  link.setAttribute("href", "indiv_recipe.html?cuisine=" + cName + "&dish=" + imglink);
  var textnode3 = document.createTextNode("Click here to view dish");
  link.appendChild(textnode3);

  
  //append everything to body
  body.appendChild(title);
  body.appendChild(cooktime);
  body.appendChild(link);
  card.appendChild(img1);
  card.appendChild(body);
  divId.appendChild(card);
}
