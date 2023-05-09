// Après avoir fait la page de login en HTML CSS, on récupère le formulaire de connexion

const form = {
    email: document.getElementById("emailu"),
    password: document.getElementById("passu"),
    submit: document.getElementById("send"),
    errorMessage: document.getElementById('error-message'),
}

let loginForm = document.getElementById("loginForm");

// On ajoute l'évènement submit où l'on récupère les informations de connexion

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

// on met ces informations dans une charge utile que l'on va envoyer à l'api avec Fetch

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
    
// L'api va nous répondre si l'utilisateur existe en nous donnant le token d'authentification 

    .then((response) => response.json())
    .then((data)=>{
        let token = data.token;
        let isLoggedIn = true;
        if (data.message ==='user not found'){
            form.errorMessage.innerHTML ='Erreur dans l’identifiant ou le mot de passe';
        }
        else{
            
            sessionStorage.setItem("isLoggedIn", isLoggedIn); // on stock le token dans le session storage
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
    
