




function buildDrinkPopUp (){

    document.getElementById("overlay").style.display = "block";
    
    let overlay = document.getElementById("overlay");

    let drinkBox = document.createElement("div");
    drinkBox.classList.add("drinkBox");


    let close = document.createElement("a");
    close.classList.add("close");
    close.href = "#";
    overlay.append(close);

    close.addEventListener("click", function (event) {
        window.location.href = "../search.html";
      });
  
} 

