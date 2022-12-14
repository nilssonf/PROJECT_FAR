function buildDrinkPopUp (id){

    document.getElementById("overlay").style.display = "block";
    
console.log(id);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(r => r.json())
        .then(rsc => console.log(rsc.drinks[0].idDrink))


    let overlay = document.getElementById("overlay");

    let drinkBox = document.createElement("div");
    drinkBox.classList.add("drinkBox");

    overlay.append(drinkBox);


    let close = document.createElement("a");
    close.classList.add("close");
    close.href = "#";
    overlay.append(close);

    close.addEventListener("click", function (event) {
        window.location.href = "../search.html";
      });

} 

