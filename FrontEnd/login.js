const form = {
    email: document.getElementById("emailu"),
    password: document.getElementById("passu"),
    submit: document.getElementById("send"),
    errorMessage: document.getElementById('error-message'),
}

/* function submitUser() {
    const formUser = document.getElementById('myform');
    formUser.addEventListener("submit", async function(event){
        event.preventDefault();
        const form = {
            email: document.getElementById("emailu"),
            password: document.getElementById("passu"),
            submit: document.getElementById("send"),
            errorMessage: document.getElementById('error-message'),
        }
        const logIn = {
            email : form.email.value,
            password  : form.password.value

        };
        console.log("form", form)
        const chargeUtile = JSON.stringify(logIn);
        fetch("http://localhost:5678/api/users/login"), {
            method: "POST",
            headers:{"Content-Type": "application/json"  },
            body: chargeUtile
        }
        
    })
    .then((response) => response.json())
    .then((data)=>{
        let token = data.token;
        let isLoggedIn = true;
        if (data.message ==='user not found'){
            form.errorMessage.innerHTML ='Erreur dans l’identifiant ou le mot de passe';
        }
        else{
            sessionStorage.setItem("isLoggedIn", isLoggedIn);
            sessionStorage.setItem("token", token);
            

        }
        console.log(token, isLoggedIn);
    })
    .catch((err) => {
        console.log(err);
    });
    
}  */

let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.getElementById("username");
    let password = document.getElementById("password");
  
    console.log('submit');
    console.log('UN', username);
    console.log('PWD', password);
    const logIn = {
        email : username.value,
        password  : password.value

    };
    
    const chargeUtile = JSON.stringify(logIn);
    console.log(chargeUtile)
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: chargeUtile, // body data type must match "Content-Type" header
    })
    .then((response) => response.json())
    .then((data)=>{
        let token = data.token;
        let isLoggedIn = true;
        if (data.message ==='user not found'){
            form.errorMessage.innerHTML ='Erreur dans l’identifiant ou le mot de passe';
        }
        else{
            
            sessionStorage.setItem("isLoggedIn", isLoggedIn);
            sessionStorage.setItem("token", token);
            /* location.assign("index.html"); */
            location.assign("index.html")
        }
        console.log(token, isLoggedIn);
        
    })
    .catch((err) => {
        console.log(err);
    });
});
    
