/*

READ: free to test!

*/


// Verified as working fetch call

//EXAMPLE: Specific drink

fetch(new Request("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"))
    .then(r => r.json())
    .then(rsc => console.log(rsc));


//** EXAMPLE: Image for specific drink


// fetch(new Request("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"))
//     .then(r => r.json())
//     .then(rsc => {
//         let img = rsc.drinks[0].strDrinkThumb;
//         document.querySelector('body').innerHTML = `<img src='${img}'>`;
//     });


// ** EXAMPLE: Random drink

// fetch(new Request("https://www.thecocktaildb.com/api/json/v1/1/random.php"))
//     .then(r => r.json())
//     .then(rsc => {
//         let img = rsc.drinks[0].strDrinkThumb;
//         document.querySelector('body').innerHTML = `<img src='${img}'>`;
//     });

// ** EXAMPLE: FIlter drink by Specific ingredient

fetch(new Request("../php/addFavorites.json"))
    .then(r => r.json())
    .then(rsc => {
        let id = rsc[1].drinkId;

        fetch(new Request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
            .then(r => r.json())
            .then(rsc => console.log(rsc));
    });