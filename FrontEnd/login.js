const form = {
    email: document.getElementById("emailu"),
    password: document.getElementById("passu"),
    submit: document.getElementById("send"),
    errorMessage: document.getElementById('error-message'),
}

 export function submitUser() {
    const formUser = document.getElementById('myform');
    formUser.addEventListener("submit", async function(event){
        event.preventDefault();
        const logIn = {
            email : form.email.value,
            password  : form.password.value

        };

        const chargeUtile = JSON.stringify(logIn);
        fetch("http://localhost:5678/api/users/login"), {
            method: "POST",
            headers:{"Content-Type": "application/json" },
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
            location.assign("index.html");

        }
        console.log(token, isLoggedIn);
    })
    .catch((err) => {
        console.log(err);
    });
    submitUser()
} 
