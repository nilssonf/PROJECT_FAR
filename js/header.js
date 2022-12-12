"use strict";

function header() {
    let header = document.querySelector("#header");
    header.classList.add("header");

    let icon;

    let logga = document.createElement("h2");
    logga.innerText = "Bottled";
    logga.classList.add("logga");

    let scroll = document.createElement("p");
    scroll.innerText = "Scroll Drinks";
    scroll.classList.add("scroll");

    let about = document.createElement("p");
    about.innerText = "About";
    about.classList.add("about");

    if (user == 0) {
        let signIn = document.createElement("div");
        signIn.innerHTML = "<img src='../profiles/circle.png' class='circle'><p>Sign in</p>";
        signIn.classList.add("signIn");
        header.append(logga, scroll, about, signIn);
    } else {
        let favourites = document.createElement("p");
        favourites.innerText = "Favourite drinks";
        favourites.classList.add("favourites");

        let signOut = document.createElement("div");
        signOut.innerHTML = "<img src='../profiles/standard_picture.png' class='standard'><p>Sign out</p>";
        signOut.classList.add("signOut");

        header.append(logga, scroll, about, favourites, signOut);
    }






    logga.onclick = function () {
        location.href = 'index.html';
    };

    scroll.onclick = function () {
        location.href = '../html/search.html';
    };

    about.onclick = function () {
        location.href = '../html/about.html';
    };


}



header();