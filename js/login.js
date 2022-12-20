"use strict";

let user = 0;
user = Number(sessionStorage.getItem("user"));

function logIn(username, pw) {

    let userObj = {
        email: username,
        password: pw
    };

    const logInRqst = new Request("../php/logIn.php", {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: { "Content-type": "application/json" }
    });

    fetch(logInRqst)
        .then(resp => {
            console.log(resp);
            if (resp.status == 200) {
                return resp.json();
            } else {
                user = 0;
                sessionStorage.setItem("user", user);
                header(user);
            }
        })
        .then(rsc => {
            user = rsc.id;
            sessionStorage.setItem("user", user);
            header(user);
            document.getElementById("myForm").style.display = "none";

        });
}

function createLogin() {

    let close = document.createElement("a");
    close.classList.add("closeSignIn");
    close.addEventListener("click", function() {
        document.getElementById("myForm").style.display = "none";
    });

    let signInForm = document.createElement("div");
    signInForm.innerHTML =

        `
            <div class="form-popup" id="myForm">
            <div class="form-container">
            
            <h2>Sign in</h2>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Email" id="email" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" id="psw" required>
        
            <button class="btn sign_in">Sign in </button>
            <button class="btn create">Create Account</button>
        
            </div>

            </div>
            
            
            `;


    document.querySelector("body").append(signInForm);
    signInForm.append(close);
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".create").addEventListener("click", createProfilePopup);
    return signIn;

}

function logOut() {
    user = 0;
    sessionStorage.setItem("user", 0);
    header(sessionStorage.getItem("user"));
}

function createProfilePopup() {
    document.getElementById("myForm").style.display = "none";

    let close = document.createElement("a");
    close.classList.add("closeCreate");
    close.addEventListener("click", function() {
        document.querySelector(".createContainer").style.display = "none";
    });

    let createUser = document.createElement("div");
    createUser.innerHTML =
        `
<div class="createContainer">
 <div class="create-popup">

    <div class="createContent" >

    <h2>Create your account</h2>

    <label for="name"><b>Your first name? </b></label>
    <input type="text" id="name" required>

    <label for="email"><b>Your email?</b></label>
    <input type="text" id="mail" required>

    <label for="password"><b>Select a password</b></label>
    <input type="password" id="password" required>

    <label for="aga"><b>Your age?</b></label>
    <input type="text" id="age" required>

    <label for="occupation"><b> Your occupation?</b></label>
    <input type="text" id="occupation" required>

    <button class="createAndSign"> Create & log in </button>

    </div>
    </div>
    </div>

    `;
    createUser.append(close);
    document.querySelector("body").append(createUser);

    let createUserButton = document.querySelector('.createAndSign');
    createUserButton.addEventListener("click", function(event) {
        event.preventDefault()
        let nameValue = document.getElementById("name").value
        let emailValue = document.getElementById("mail").value
        let passwordValue = document.getElementById("password").value
        let ageValue = document.getElementById("age").value
        let occupationValue = document.getElementById("occupation").value
        console.log(nameValue, emailValue, passwordValue, ageValue, occupationValue)


        let rqst_add = new Request("../php/createUser.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameValue, email: emailValue, password: passwordValue, age: ageValue, occupation: occupationValue })

        })

        fetch(rqst_add)
            .then(r => {
                console.log(r)
                if (r.status == 200) {
                    createWelcome(nameValue)
                    logIn(emailValue, passwordValue)
                }
                return r.json()
            })
            .then(console.log)


    })
}

function createWelcome(nameValue) {
    document.querySelector(".create-popup").style.display = "none"

    let close = document.createElement("a");
    close.classList.add("closeWelcome");
    close.addEventListener("click", function() {
        document.querySelector(".welcomeContainer").style.display = "none";
    });

    let createWelcome = document.createElement("div");
    createWelcome.innerHTML =
        `
<div class="welcomeContainer">
 <div class="welcome-popup">

    <div class="welcomeContent" >

    <h2>Welcome ${nameValue}</h2>

    <p>Get started by browsing some drinks and don’t forget to add the ones you like to your favorites!</p>
    <button class="closeButton"> Close</button>
    <button class="profileButton"> Profile</button>

    </div>
    </div>
    </div>

    `;
    createWelcome.append(close);
    document.querySelector("body").append(createWelcome);

    document.querySelector(".closeButton").addEventListener("click", function() {
        createWelcome.style.display = "none"
    })

    document.querySelector(".profileButton").addEventListener("click", function() {
        location.href = '../html/profile.html';
    })
}