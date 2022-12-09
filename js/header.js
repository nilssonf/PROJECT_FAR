"use strict";

function createHeader() {
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

    let signIn = document.createElement("p");
    signIn.innerText = "Sign in"
    signIn.classList.add("signIn");

    header.append(logga, scroll, about, signIn)


    logga.onclick = function() {
        location.href = 'index.html'
    }

    scroll.onclick = function() {
        location.href = '../html/search.html'
    }

    about.onclick = function() {
        location.href = '../html/about.html'
    }
}

createHeader()