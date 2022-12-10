"use strict";

function header() {
    let header = document.querySelector("#header");
    header.classList.add("header");

    let logga = document.createElement("h2");
    logga.innerText = "Bottled"
    logga.classList.add("logga");

    let scroll = document.createElement("p");
    scroll.innerText = "Scroll Drinks"
    scroll.classList.add("sroll");

    let about = document.createElement("p");
    about.innerText = "About"
    about.classList.add("about");

    if (user == 0) {
        let signIn = document.createElement("p");
        signIn.innerText = "Sign in"
        signIn.classList.add("signIn");
        header.append(logga, scroll, about, signIn)
    } else {

        let favourites = document.createElement("p");
        favourites.innerText = "Favourite drinks"
        favourites.classList.add("favourites")

        let signOut = document.createElement("p");
        signOut.innerText = "Sign out"
        signOut.classList.add("signOut");

        header.append(logga, scroll, about, favourites, signOut);

        favourites.onclick = function() {
            location.href = '../html/favorites.html';
        };
    }


    logga.onclick = function() {
        location.href = 'index.html';
    };

    scroll.onclick = function() {
        location.href = '../html/search.html';
    };

    about.onclick = function() {
        location.href = '../html/about.html';
    };


}



header()