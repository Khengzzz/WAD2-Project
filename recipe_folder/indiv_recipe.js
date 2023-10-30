const urlParams = new URLSearchParams(window.location.search);
var cuisine= urlParams.get('cuisine');
console.log(cuisine)

var dish = urlParams.get('dish');
console.log(dish)

const vm=Vue.createApp(
    {data(){
               return{
             
               }},
               method:({




               })
            
            
            
            
            }
 )

 const app=vm.mount("#app")

//call from json file
var url = "./assets/recipesStorage.json"
axios.get(
url
)
.then(response =>  {
    console.log(response.data)


})