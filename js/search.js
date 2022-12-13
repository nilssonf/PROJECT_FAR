"use strict";

function getDrinksByLetter(letter) {

    document.querySelector("#wrapper").innerHTML = " "

    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`))
        .then(r => r.json())
        .then(rsc => {
            createDrinks(rsc)

        })
}

function getDrinksByName(name) {

    document.querySelector("#wrapper").innerHTML = " "

    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`))
        .then(r => r.json())
        .then(rsc => {
            createDrinks(rsc)

        })
}

function createDrinks(rsc) {
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
        
                        <p>${drinkGlass} </p> 
                    </div>
                </div>
                 <img src="../images/gilla.png" class="heartImg">
                `;

        drinkBox.classList.add("drinkBox");
        document.querySelector("#wrapper").append(drinkBox);



    })
}

function getsearchedDrink() {
    document.getElementById("click").addEventListener("click", function() {
        let search = document.getElementById("drinkName").value
        getDrinksByName(search)

    })
}

function createAlphabet() {

    let alphabetOne = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

    let alphabetTwo = [
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
    ];

    let alphabetThree = ['V', 'W', 'X',
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
            getDrinksByLetter(clickedLetter)
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
            getDrinksByLetter(clickedLetter)
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
            getDrinksByLetter(clickedLetter)
        })
    })

}

function createFilterAlcohol(alcohol) {

    let chooseAlcohol = document.getElementById("chooseAlcohol");
    let alcoholArray = alcohol.drinks;

    alcoholArray.forEach((a) => {
        let option = document.createElement("option");
        option.text = a.strAlcoholic;
        chooseAlcohol.append(option);
    })


}

function getAlcoholic() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterAlcohol(rsc)
        })
}

function createFilterCategory(category) {

    let chooseCategory = document.getElementById("chooseCategory");
    let categoryArray = category.drinks;

    categoryArray.forEach((c) => {
        let option = document.createElement("option");
        option.text = c.strCategory;
        chooseCategory.append(option);
    })


}


function getCategory() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterCategory(rsc)
        })
}

function createFilterGlass(glass) {

    let chooseGlass = document.getElementById("chooseGlass");
    let glassArray = glass.drinks;

    glassArray.forEach((g) => {
        let option = document.createElement("option");
        option.text = g.strGlass;
        chooseGlass.append(option);
    })


}


function getGlass() {
    fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`))
        .then(r => r.json())
        .then(rsc => {
            createFilterGlass(rsc)
        })
}



getDrinksByLetter("a")
getsearchedDrink()
createAlphabet()
getAlcoholic()
getCategory()
getGlass()