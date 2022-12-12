"use strict";

function createAllDrinks(letter) {

    document.querySelector("#wrapper").innerHTML = " "

    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`))
        .then(r => r.json())
        .then(rsc => {
            rsc.drinks.forEach(drink => {
                let oneDrink = drink.strDrink
                let drinkImg = drink.strDrinkThumb
                let drinkAlcoholic = drink.strAlcoholic
                let drinkCategory = drink.strCategory
                let drinkGlass = drink.strGlass

                let drinkBox = document.createElement("div");
                drinkBox.innerHTML = `
                <div class="imgWrap">
                    <img src="${drinkImg}" class="drinkImg">
                </div>
                <div class="text">
                    <h3>${oneDrink} </h3>
                    <div class="tags">
                        <p> ${drinkAlcoholic} </p>
                        <p>${drinkCategory} </p>
                        <br>
                        <p>${drinkGlass} </p> 
                    </div>
                </div>
                 <img src="../images/gilla.png" class="heartImg">
                `;

                drinkBox.classList.add("drinkBox");
                document.querySelector("#wrapper").append(drinkBox);


            })
        })
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

        text.addEventListener("click", function(e) {
            let clickedLetter = e.target.innerHTML
            clickedLetter = clickedLetter.toLowerCase()
            createAllDrinks(clickedLetter)
        })
    })

    alphabetTwo.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetTwo");
        aDiv.append(text)

        text.addEventListener("click", function(e) {
            let clickedLetter = e.target.innerHTML
            clickedLetter = clickedLetter.toLowerCase()
            createAllDrinks(clickedLetter)
        })
    })

    alphabetThree.forEach(letter => {
        let text = document.createElement("p");
        text.innerHTML = letter;
        let aDiv = document.querySelector(".alphabetThree");
        aDiv.append(text)

        text.addEventListener("click", function(e) {
            let clickedLetter = e.target.innerHTML
            clickedLetter = clickedLetter.toLowerCase()
            createAllDrinks(clickedLetter)
        })
    })

}


createAllDrinks("a")
createAlphabet()