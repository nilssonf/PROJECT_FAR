"use strict";

function createAllDrinks() {

    // change loop and loop through API and all drinks
    for (let i = 0; i < 4; i++) {
        let drinkBox = document.createElement("div");
        drinkBox.innerHTML = "<img src='../images/test.png' class='drinkImg'><p>Drink Name <br><br>Tag Tag Tag</p> <img src='../images/test.png' class='heartImg'>";
        drinkBox.classList.add("drinkBox");
        document.querySelector("#wrapper").append(drinkBox);

    }
}

function createAlphabet() {

    let alphabet = [...
        'abcdefghijklmnopqrstuvwxyz'
    ];

    alphabet.forEach(letter => {
        let text = document.createElement("p")
        text.innerHTML = letter.toUpperCase()
        let aDiv = document.querySelector(".alphabet");
        aDiv.append(text)
    })
}


createAllDrinks()
createAlphabet()