var url = "recipesStorage.json";
axios.get(url)
  .then(response => {
    var test1 = response.data.recipes;
    var cuisineList = [];
    getCuisines(cuisineList, test1);
    console.log(cuisineList)

    for (u in cuisineList) {
      console.log("Processing cuisine:", cuisineList[u]);

      var cuisineNameHolder = document.createElement("div");
      cuisineNameHolder.setAttribute("class", "row text-center spacing");
      var cuisineName = document.createElement("h2");
      var textnode = document.createTextNode(cuisineList[u]);
      cuisineName.appendChild(textnode);
      cuisineNameHolder.appendChild(cuisineName);

      var currentCuisine = test1.find(item => item.cuisine === cuisineList[u]);
      console.log("Current cuisine data:", currentCuisine);

      var disheslist = currentCuisine.dishes;
      var divId = cuisineList[u].toLowerCase(); // Get the lowercase cuisine name as the divId
      
      console.log("Current divId:", divId);

      var divEle = document.getElementById(divId); // Find the div with the specific cuisine ID
      console.log("Current divEle:", divEle);

      if (!divEle) {
        divEle = document.createElement("div"); // Create a new div if the ID doesn't exist
        divEle.setAttribute("id", divId);
        divEle.setAttribute("class", "row justify-content-center spacing");
      }

      for (i in disheslist) {
        var dishname = disheslist[i].name;
        var dishtime = disheslist[i].time;
        var dishImg = disheslist[i].img;
        createCard(dishname, dishtime, dishImg, divEle, cuisineList[u]);
      }

      var overall = document.getElementById(cuisineList[u].toLowerCase()); // Use the section ID to append the elements
    //   overall.appendChild(cuisineNameHolder);
    //   overall.appendChild(divEle);
    }
  });

function getCuisines(cuisineList, database) {
  for (x in database) {
    cuisineList.push(database[x].cuisine);
  }
}

function createCard(dishName, preptime, imglink, divId, cName) {
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.display = "inline-block";
  card.style.padding = "10px";
  card.style.margin = "15px";
  card.style.borderRadius = "10%"

  var img1 = document.createElement("img");
  img1.setAttribute("src", "../images/" + imglink + ".jpeg");
  img1.setAttribute("class", "card-img-top");

  var body = document.createElement("div");
  body.setAttribute("class", "card-body");

  var title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  var textnode = document.createTextNode(dishName);
  title.appendChild(textnode);

  var cooktime = document.createElement("p");
  var textnode2 = document.createTextNode(preptime);
  cooktime.appendChild(textnode2);

  var link = document.createElement("a");
  link.setAttribute("href", "indiv_recipe.html?cuisine=" + cName + "&dish=" + imglink);
  var textnode3 = document.createTextNode("Click here to view dish");
  link.appendChild(textnode3);

  body.appendChild(title);
  body.appendChild(cooktime);
  body.appendChild(link);
  card.appendChild(img1);
  card.appendChild(body);

  divId.style.display = "flex"; // Set the display property of the container to flex
  divId.style.flexDirection = "row"; // Set the flex-direction property to row
  divId.style.flexWrap = "wrap"; // Set the flex-wrap property to wrap

  divId.appendChild(card);
}
