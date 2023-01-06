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
            if (resp.status == 200) {
                return resp.json();
            } else {
                user = 0;
                sessionStorage.setItem("user", user);
                header(user);
                document.querySelector(".wrongInlogg").style.display = "block";
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

    let signInForm = document.createElement("div");
    signInForm.classList.add("signInForm");
    signInForm.innerHTML =

        `
            <div class="form-popup" id="myForm">
            <div class="form-container" id="signInBtn">
            
            <h2 class ="loginH">Sign in</h2>

            <label for="username"><b>Email</b></label>
            <input type="text" id="email" required>
        
            <label for="psw"><b>Password</b></label>
            <input type="password"  id="psw" required>
        
            <p class= "wrongInlogg">Email/password is incorrect</p>
            
            <button class="btn sign_in">Sign in </button>
            <button class="btn create">Create Account</button>
        
            </div>

            </div>
            
            
            `;


    document.querySelector("body").append(signInForm);
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".wrongInlogg").style.display = "none";
    document.querySelector(".create").addEventListener("click", function() {
        document.querySelector(".signInForm").remove();

        createProfilePopup()
    });
    return signInForm;
}

function closeSignInBtn() {
    let close = document.createElement("a");
    close.classList.add("closeSignIn");
    close.addEventListener("click", function() {
        document.querySelector(".signInForm").remove();
    });

    document.getElementById("signInBtn").append(close);
}

function logOut() {
    user = 0;
    sessionStorage.setItem("user", 0);
    header(sessionStorage.getItem("user"));
}

function createProfilePopup() {

    let createUser = document.createElement("div");
    createUser.classList.add("createUser");
    createUser.innerHTML = `
        <div class="createContainer">
            <div class="create-popup">

                <div class="createContent" id="createClose" >

                    <h2 class="createH2">Create your account</h2>

                    <label class="createLabelStyle" for="name"><b>Your first name? </b></label>
                    <input class="createInput" type="text" id="name" required>

                    <label class="createLabelStyle" for="email"><b>Your email?</b></label>
                    <input class="createInput" type="text" id="mail" required>

                    <label class="createLabelStyle" for="password"><b>Select a password</b></label>
                    <input class="createInput" type="password" id="password" required>

                    <label class="createLabelStyle" for="aga"><b>Your age?</b></label>
                    <input class="createInput" type="text" id="age" required>

                    <label class="createLabelStyle" for="occupation"><b> Your occupation?</b></label>
                    <input class="createInput" type="text" id="occupation" required>

                    <p class="wrongMessage"> </p>

                    <button class="createAndSign"> Create & log in </button>

                </div>
            </div>
        </div>
    `;
    document.querySelector("body").append(createUser);

    closeCreateBtn()

    let createUserButton = document.querySelector('.createAndSign');
    createUserButton.addEventListener("click", function(event) {
        event.preventDefault()
        let nameValue = document.getElementById("name").value
        let emailValue = document.getElementById("mail").value
        let passwordValue = document.getElementById("password").value
        let ageValue = document.getElementById("age").value
        let occupationValue = document.getElementById("occupation").value

        let rqst_add = new Request("../php/createUser.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameValue, email: emailValue, password: passwordValue, age: ageValue, occupation: occupationValue })

        })

        fetch(rqst_add)
            .then(r => {
                if (r.status == 200) {
                    createWelcome(nameValue)
                    logIn(emailValue, passwordValue)
                    return r.json()
                } else {
                    return r.json().then(message => {
                        document.querySelector(".wrongMessage").innerHTML = message.message

                    })
                }
            })
            .then(console.log)

        document.querySelector(".createAndSignIn").remove();
    })
}

function closeCreateBtn() {

    let close = document.createElement("a");
    close.classList.add("closeCreate");
    close.addEventListener("click", function() {
        document.querySelector(".createUser").remove();
        location.reload();
    });

    document.getElementById("createClose").append(close);
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