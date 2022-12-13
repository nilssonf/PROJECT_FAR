"use strict";

let user = 1;

window.onload = getRandomIngredients();

window.onload = getRandomDrinks();


function getRandomIngredients() {

    const rqstIngredients = new Request("../php/topIngredients.json");

    fetch(rqstIngredients)
        .then(r => r.json())
        .then(ingredients => {
            const n = 3;
            let ingredient3 = ingredients
            .map(x => ({ x, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(a => a.x)
            .slice(0, n);
            console.log(ingredient3)

            showTopIngredients(ingredient3);

        });

}

function getRandomDrinks() {

    const rqstDrinks = new Request("../php/topDrinks.json");

    fetch(rqstDrinks)
        .then(r => r.json())
        .then(drinks => {
            const n = 3;
            let drink3 = drinks
            .map(x => ({ x, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(a => a.x)
            .slice(0, n);
            console.log(drink3)

            showTopDrinks(drink3)
        });
}

function showTopDrinks (drink3){


    let drinks = [];

    drink3.forEach(drink => {
       
    
        fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.drinkId}`))
        .then(r => r.json())
        .then(rsc => {
            
            drinks.push(`${rsc.drinks[0].strDrinkThumb}`); 
            
            
            
        });



    });

    console.log(drinks[0]);
   let topDrinkOne = document.createElement("img")
   
   topDrinkOne.src = drinks[0];

   document.querySelector(".drinkOne").append(topDrinkOne);

   console.log(topDrinkOne);

  

   
}

// function showTopIngredients (ingredient3){
//     let ingredients = [];

//    ingredient3.forEach(ingredient => {
       
    
//         fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ingredient.ingId}`))
//         .then(r => r.json())
//         .then(rsc => {
            
//             document.createElement("img").src = `${rsc.drinks[0].strDrinkThumb}`; 
            
            
            
//         });



//     });
    
// }