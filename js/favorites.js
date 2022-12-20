"use strict";

<<<<<<< Updated upstream
function createFavorites() {
=======
let array = [];

function getFavoriteId() {

    let rqst = new Request("../php/favorites.json");
    fetch(rqst)
        .then(r => r.json())
        .then(favorites => {
            favorites.forEach(f => {
                if (f.userId == user) {
                    let drinkId = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${f.drinkId}`);
                    fetch(drinkId)
                        .then(r => r.json())
                        .then(rsc => {
                            array.push(rsc.drinks[0]);
                            createFavorites(rsc.drinks);

                        });
                }

            });
        });

}



function createFavorites(drinks) {

    drinks.forEach(drink => {

        let drinkId = drink.idDrink;
        let oneDrink = drink.strDrink
        let drinkImg = drink.strDrinkThumb
        let drinkAlcoholic = drink.strAlcoholic
        let drinkCategory = drink.strCategory
        let drinkGlass = drink.strGlass
>>>>>>> Stashed changes

    // change loop and loop through favourites.json
    for (let i = 0; i < 4; i++) {
        let favoriteBox = document.createElement("div");
        favoriteBox.innerHTML = "<img src='../images/test.png' class='favoriteImg'><p>Drink Name <br><br>Tag Tag Tag</p> <img src='../images/test.png' class='heartImg'>";
        favoriteBox.classList.add("favoriteBox");
        document.querySelector("#wrapper").append(favoriteBox);

    }
}

createFavorites()