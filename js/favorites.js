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

        let favoriteBox = document.createElement("div");
        favoriteBox.innerHTML = `<img src="../images/test.png" class="favoriteImg"><p>${drink.strDrink}<br><br>Tag Tag Tag</p> <img src="../images/test.png" class="heartImg">`;
        favoriteBox.classList.add("favoriteBox");
        document.querySelector("#wrapper").append(favoriteBox);

    })
}