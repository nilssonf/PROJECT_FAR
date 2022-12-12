"use strict";

function createFavorites() {

    // change loop and loop through favourites.json
    for (let i = 0; i < 4; i++) {
        let favoriteBox = document.createElement("div");
        favoriteBox.innerHTML = "<img src='../images/test.png' class='favoriteImg'><p>Drink Name <br><br>Tag Tag Tag</p> <img src='../images/test.png' class='heartImg'>";
        favoriteBox.classList.add("favoriteBox");
        document.querySelector("#wrapper").append(favoriteBox);

    }
}

createFavorites()