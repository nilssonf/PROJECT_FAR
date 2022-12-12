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

    let alphabetOne = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', ];

    let alphabetTwo = [
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
    ];

    let alphabetThree = ['U', 'V', 'W', 'X',
        'Y', 'Z'
    ];


    alphabetOne.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetOne");
        aDiv.append(text)
    })

    alphabetTwo.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetTwo");
        aDiv.append(text)
    })

    alphabetThree.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetThree");
        aDiv.append(text)
    })
}


createAllDrinks()
createAlphabet()