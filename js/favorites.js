"use strict";

let array = []

function getFavoriteId() {

    let rqst = new Request("../php/favorites.json")
    console.log(rqst)
    fetch(rqst)
        .then(r => r.json())
        .then(favorites => {
            favorites.forEach(f => {
                if (f.userId == user) {
                    let drinkId = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${f.drinkId}`)
                    fetch(drinkId)
                        .then(r => r.json())
                        .then(rsc => {
                            console.log(rsc.drinks[0])
                            array.push(rsc.drinks[0])
                            createFavorites(rsc.drinks)

                        })
                }

            })
        })

}



function createFavorites(drinks) {

    drinks.forEach(drink => {

        let oneDrink = drink.strDrink
        let drinkImg = drink.strDrinkThumb
        let drinkAlcoholic = drink.strAlcoholic
        let drinkCategory = drink.strCategory
        let drinkGlass = drink.strGlass

        let favoriteBox = document.createElement("div");
        favoriteBox.innerHTML = `

               <div class="imgWrap">
                   <img src="${drinkImg}" class="drinkImg">
               </div>
               <div class="text">
                   <h3>${oneDrink} </h3>
                   <div class="tags">
                       <p> ${drinkAlcoholic} </p>
                       <p>${drinkCategory} </p>
      
                       <p>${drinkGlass} </p>
                   </div>
               </div>
                <img src="../images/gillasvart.png" class="heartImg">
               `;
        favoriteBox.classList.add("favoriteBox");
        document.querySelector("#wrapper").append(favoriteBox);

    })
}