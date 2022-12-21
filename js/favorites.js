"use strict";

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
                        .then(r => {
                            return r.json()
                        })
                        .then(rsc => {
                            array.push(rsc.drinks[0]);
                            createFavorites(rsc.drinks);

                        })
                }
            });
        });
}



function createFavorites(drinks) {
    if (drinks === "empty") {
        let noDrinks = document.createElement("div")
        document.querySelector(".favoritesDrinks").style.display = "none"
        noDrinks.innerHTML =
            `<p class="noDrinks">You don't have any favorite drinks</p>
            <p class="clickHere"> Click &nbsp <a class ="link" href="../html/search.html"> here </a> &nbsp to scroll drinks and like some of your favorites</p>


        `

        document.querySelector('#wrapper').append(noDrinks)
        wrapper.style.height = "100vh"

    }

    drinks.forEach(drink => {

        let drinkId = drink.idDrink;
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
                <img src="../images/gillasvart.png" class="heartImgFav" id="${drinkId}">
               `;
        favoriteBox.classList.add("favoriteBox");
        document.querySelector("#wrapper").append(favoriteBox);


    });

    let heart = document.querySelectorAll('.heartImgFav')
    heart.forEach(h => {
        h.addEventListener('click', function() {
            let clickedIdRemove = h.id;
            deleteFavorite(clickedIdRemove)
        })
    })
}

function addNewFavorite(clickedId) {
    let newFavorite = {
        drinkId: clickedId,
        userId: sessionStorage.getItem("user")
    };

    const addNewFav = new Request("../php/addFavorites.php", {
        method: 'POST',
        body: JSON.stringify(newFavorite),
        headers: { "Content-type": "application/json" }
    });

    fetch(addNewFav)
        .then(r => r.json())
        .then(rsc => console.log(rsc));
}

function deleteFavorite(clickedIdRemove) {
    let deleteFavorite = {
        drinkId: clickedIdRemove,
    };

    const deleteFav = new Request("../php/deleteFavorites.php", {
        method: 'DELETE',
        body: JSON.stringify(deleteFavorite),
        headers: { "Content-type": "application/json" }
    });

    fetch(deleteFav)
        .then(r => r.json())
        .then(rsc => {
            console.log(rsc)
        });

    location.reload()
}

getFavoriteId();