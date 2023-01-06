"use strict";

let array = [];
let notLiked = [];

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
                            return r.json();
                        })
                        .then(rsc => {
                            array.push(rsc.drinks[0]);
                            createFavorites(rsc.drinks);


                        });

                } else if (f.userId != user) {
                    let drinkId = f.userId;
                    notLiked.push(drinkId);

                    if (notLiked.length == favorites.length) {
                        createFavorites("empty");
                    }
                }
            });
        });

    setTimeout(() => {
        let drinks = document.querySelectorAll('.text');
        drinks.forEach(drink => {
            let drinkName = drink.querySelector('h3').textContent;
            drink.addEventListener("click", function() {
                fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`))
                    .then(r => r.json())
                    .then(rsc => {
                        let topDrinkId = rsc.drinks[0].idDrink;
                        sessionStorage.setItem("topDrinkId", topDrinkId);
                        location.href = "../html/search.html";

                    });
            });
        });
    }, 200);
}

function createFavorites(drinks) {

    if (drinks === "empty") {
        let noDrinks = document.createElement("div");
        document.querySelector(".favoritesDrinks").style.display = "none";
        noDrinks.innerHTML =
            `<p class="noDrinks">You don't have any favorite drinks</p>
            <p class="clickHere"> Click &nbsp <a class ="link" href="../html/search.html"> here </a> &nbsp to scroll drinks and like some of your favorites</p>
        `;
        document.querySelector('#favoritesWrapper').append(noDrinks);
        document.querySelector('#favoritesWrapper').style.height = "100vh";

    }

    drinks.forEach(drink => {

        let drinkId = drink.idDrink;
        let oneDrink = drink.strDrink;
        let drinkImg = drink.strDrinkThumb;
        let drinkAlcoholic = drink.strAlcoholic;
        let drinkCategory = drink.strCategory;
        let drinkGlass = drink.strGlass;

        let favoriteBox = document.createElement("div");
        favoriteBox.innerHTML = `

               <div class="imgWrap">
                   <img src="${drinkImg}" class="drinkImg">
               </div>
               <div class="text">
                   <h3 class='drinkName'>${oneDrink} </h3>
                   <div class="tags">
                       <p> ${drinkAlcoholic} </p>
                       <p>${drinkCategory} </p>
      
                       <p>${drinkGlass} </p>
                   </div>
               </div>
                <img src="../images/gillasvart.png" class="heartImgFav" id="${drinkId}">
               `;
        favoriteBox.classList.add("favoriteBox");
        document.querySelector("#favoritesWrapper").append(favoriteBox);


    });

    let heart = document.querySelectorAll('.heartImgFav');
    heart.forEach(h => {
        h.addEventListener('click', function() {
            let clickedIdRemove = h.id;
            deleteFavorite(clickedIdRemove, user);
        });
    });
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

function deleteFavorite(clickedIdRemove, user) {

    fetch("../php/favorites.json")
        .then(r => r.json())
        .then(fav => {
            fetch("../php/users.json")
                .then(r => r.json())
                .then(u => {
                    u.forEach(usr => {
                        if (usr.id == user) {
                            fav.forEach(f => {
                                if (clickedIdRemove == f.drinkId && Number(f.userId) == user) {
                                    let deleteFavorite = {
                                        favoriteId: f.favoriteId,
                                    };

                                    const deleteFav = new Request("../php/deleteFavorites.php", {
                                        method: 'DELETE',
                                        body: JSON.stringify(deleteFavorite),
                                        headers: { "Content-type": "application/json" }
                                    });

                                    fetch(deleteFav)
                                        .then(r => r.json())
                                        .then(rsc => {
                                            console.log(rsc);
                                        });
                                    setTimeout(() => {

                                        location.reload();
                                    }, 200);
                                }
                            })
                        }
                    })
                })

        })



}

getFavoriteId();