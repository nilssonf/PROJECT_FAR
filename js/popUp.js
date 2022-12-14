function buildDrinkPopUp (id){

    document.getElementById("overlay").style.display = "block";

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(r => r.json())
        .then(rsc => {
            choosenDrink(rsc)
        })
} 

function choosenDrink(rsc){

    console.log(rsc);
    let overlay = document.getElementById("overlay");

    let drinkName = rsc.drinks[0].strDrink;
    let drinkImg = rsc.drinks[0].strDrinkThumb;
    let drinkInstructions = rsc.drinks[0].strInstructions;
    let drinkGlass = rsc.drinks[0].strGlass;

    
    let drinkBox = document.createElement("div");
    drinkBox.classList.add("showOneDrinkDiv");

    drinkBox.innerHTML =`
        <div><img class="overlayDrinkImg" src="${drinkImg}"></div>
        <div>
            <h2>${drinkName}</h2>
            <h3>Ingredients:</h3>
            <h3>Recommended glass:</h3>
            <p>${drinkGlass}</p>
        </div>
        <div>
            <h3>Steps:</h3>
            <p>${drinkInstructions}</p>
        </div>

    `;

    overlay.append(drinkBox);


    let close = document.createElement("a");
    close.classList.add("close");
    close.href = "#";
    overlay.append(close);

    close.addEventListener("click", function (event) {
        window.location.href = "../search.html";
      });
}

