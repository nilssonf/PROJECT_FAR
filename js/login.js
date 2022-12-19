"use strict";

let user = 0;

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
                sessionStorage.setItem("user", user);
                return resp.json();
            } else {
                user = 0;
                sessionStorage.setItem("user", user);
                header(user);
            }
        })
        .then(rsc => {
            user = rsc.id;
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
    document.querySelector(".create").addEventListener("click", createProfile)
    return signIn;

}

function logOut() {
    user = 0;
    sessionStorage.setItem("user", 0);
    header(sessionStorage.getItem("user"));
}

function createProfile() {
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
    <input type="text" id="email" required>

    <label for="password"><b>Select a password</b></label>
    <input type="password" id="password" required>

    <button class="btn createAndSign"> Create & log in </button>

    </div>
    </div>
    </div>

    `
    createUser.append(close)

    document.querySelector("body").append(createUser);


}