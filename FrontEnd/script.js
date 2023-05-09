// On récupère les traveaux grâce à la fonction fetch


async function getWorks () { 
    const reponse = await fetch ("http://localhost:5678/api/works");
    const works = await reponse.json();
    return Promise.resolve(works)
};

// On viens les mettre dans une constante et on les affiche avec une fonction

const sophieWorks = await getWorks();
console.log(sophieWorks);

function genererSophieWorks(sophieWorks){
    sophieWorks.forEach(sophieWork => {
    
    
        const divWork = document.createElement("figure");
        
        const imgWork = document.createElement("img");
        imgWork.src = sophieWork.imageUrl;
        
        const titleWork = document.createElement ("figcaption");
        titleWork.innerText = sophieWork.title;
        
        
        
        const sectionGallery = document.querySelector(".gallery");
        sectionGallery.appendChild(divWork);
        divWork.appendChild(imgWork);
        divWork.appendChild(titleWork);
        
        
        
    });
    
}
genererSophieWorks(sophieWorks);

// On viens faire la mm chose avec les catégories

async function getCategories () { 
    const reponse = await fetch ("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    return Promise.resolve(categories)
}

const categories = await getCategories()
categories.forEach(cat =>{
    console.log(cat)
})

// dans une boucle on utilise les catégories pour créer les boutons de filtres

for (let i = 0; i< categories.length; i++){
    const cat = categories[i];
    const filtres = document.querySelector(".filters");
    const allButton = document.querySelector('.all');
    
    const buttonFiltrer = document.createElement("button");
    buttonFiltrer.innerText = categories[i].name;
    buttonFiltrer.classList.add('white');
    
    filtres.appendChild(buttonFiltrer); 


    buttonFiltrer.addEventListener("click",function(){
            
            const sophieWorksFiltrer = sophieWorks.filter(sophieWork=>sophieWork.categoryId === cat.id)
            document.querySelector(".gallery").innerHTML = '';
            genererSophieWorks(sophieWorksFiltrer);
            
        }); 
        allButton.addEventListener('click',function(){
            
            document.querySelector(".gallery").innerHTML = '';
            genererSophieWorks(sophieWorks);
        }); 
        buttonFiltrer.addEventListener("click", function(button) {
            if (button.target.classList.contains("selected")){
                return;
            }
            if (document.querySelector('button.selected') !== null) {
              document.querySelector('button.selected').classList.remove('selected');
            }
            button.target.classList.add("selected");
          });
          allButton.addEventListener("click", function(button) {
            if (button.target.classList.contains("selected")) {
              return;
            }
            if (document.querySelector("button.selected") !== null) {
              document.querySelector("button.selected").classList.remove("selected");
            }
            button.target.classList.add("selected");
          });
};


     /* buttons.forEach(button =>{
        button.addEventListener("click", function(){
            buttons.forEach(button => {
                button.classList.remove("selected");
            });
            this.classList.add("selected");
            
            const filteredSophieWorks = sophieWorks.filter(sophieWork=>sophieWork.categoryId === cat.id);
            
            document.querySelector(".gallery").innerHTML = '';
            genererSophieWorks(filteredSophieWorks);
            console.log(cat);
        });
        allButton.addEventListener('click',function(){
            console.log(cat);
            document.querySelector(".gallery").innerHTML = '';
            genererSophieWorks(sophieWorks);
        });
        
    });  */
  


/* buttonFiltrer.addEventListener("click", function(button) {
    if (button.target.classList.contains("selected")){
        return;
    }
    if (document.querySelector('.green selected') !== null){
        document.querySelector('.green selected').classList.remove('selected');
    }
    button.target.classList.add("selected");
});
 */
// Maintenant que l'on est connecté et stocké le token, on reviens sur la page du site mais avec des boutons pour éditer le site

const divForm = document.querySelector('form');
const logForm = document.getElementById("logform");


const logout = document.getElementById('logout');
const logNav = document.getElementById('login-nav');
const pNav = document.getElementById('login-p');
const iNav = document.getElementById('login-i');
const iProject = document.getElementById('iproject');
const paraNav = document.getElementById('myBtn');
const authentificationState = sessionStorage.getItem("token");
console.log(authentificationState);
if(authentificationState && authentificationState.length > 0){
    iProject.style.display = 'flex'
    logout.innerText = "logout"
    logNav.style.display = 'flex'
    pNav.style.display = 'flex'
    paraNav.style.display = 'flex'
    iNav.style.display = 'flex'
}else{
    iProject.style.display = 'none'
    iNav.style.display = 'none'
    logNav.style.display = 'none'
    pNav.style.display = 'none'
    paraNav.style.display = 'none'
};

// On a créer une modale qui s'ouvre lorsque l'on souhaite modifier la liste des projets en HTML

const modalContainer = document.getElementById('modal-container');
const modalButton = document.getElementById("myBtn");
modalButton.addEventListener('click', function(){
    modalContainer.style.display = 'flex'
});



const modalWorks = await getWorks();
console.log(modalWorks);

// On affiche dans la modale les traveaux de la même manière que l'on avait fait pour la page du site

function generateWorksModal(){
    modalWorks.forEach(modalWork =>{
        const modalGallery = document.querySelector(".m-gallery")
        const modalWorkFigure = document.createElement("figure");
        const modalWorkImg = document.createElement("img");
        modalWorkImg.src = modalWork.imageUrl ;
        const modalWorkEdit = document.createElement("figcaption");
        modalWorkEdit.innerText = "éditer";
        modalWorkEdit.style.marginBottom = "7px";
        const deleteWorkButton = document.createElement("button");
        const imgDeleteButton = document.createElement("img");
        imgDeleteButton.src = "assets/icons/trash-can-solid.svg";
        
        deleteWorkButton.appendChild(imgDeleteButton);
        modalWorkImg.appendChild(deleteWorkButton);
        modalGallery.appendChild(modalWorkFigure);
        modalWorkFigure.appendChild(modalWorkImg);
        modalWorkFigure.appendChild(deleteWorkButton);
        modalWorkFigure.appendChild(modalWorkEdit);
       
// on a mis un bouton qui permet de suprrimer un travail de la gallerie avec encore la fonction fetch (delete cette fois ci)

        deleteWorkButton.addEventListener("click", async function(){
            const deleteWork = await fetch(`http://localhost:5678/api/works/${modalWork.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${sessionStorage["token"]}`,
                }
            });
            await refreshWorks();
            document.querySelector(".gallery").innerHTML = "";
            genererSophieWorks(sophieWorks);
            document.querySelector(".m-gallery").innerHTML = "";
            generateWorksModal();
        })
        
});
}
generateWorksModal(modalWorks);


//ici on peut fermer la modale et revenir à la modale précédante

const closeBtn = document.querySelector('.close-modal-trigger');
closeBtn.addEventListener('click',function(){
    modalContainer.style.display = 'none'
});
const returnButton = document.getElementById('return')
returnButton.addEventListener('click',function(){
    modalone.style.display = 'flex'
    modalAdd.style.display = 'none'
})
window.addEventListener("click", function(event) {
    if (event.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });


// ici en appyant sur le bouton "ajouter une photo" on arrive sur la modale d'ajout de travail

const modalone = document.getElementById('content-one');
const modalAdd = document.getElementById('content-two');
const addBtn = document.getElementById('addModal');
addBtn.addEventListener('click', function(){
    modalone.style.display = 'none'
    modalAdd.style.display = 'flex'
});




let input = document.getElementById('pic-file');
const previewImg = document.getElementById('preview');
input.style.opacity = 0;

  //pubication de nouveau projets

  const formulaire = document.getElementById('pic-file');
  // On appele la fonction display image dans le formulaire quand on choisi une image dans l'input de type file
  formulaire.addEventListener("change", function(){
    const fileExtension = /\.(jpg|png)$/i;
    if(this.files.length === 0 || !fileExtension.test(this.files[0].name)){
        return
    }

    previewImg.innerHTML = "";

    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.addEventListener("load", (e) => displayImage(e, file));

});

// ici la fonction display image qui permet de charger une preview de l'image

function displayImage(e, file){
    const figureElement = document.createElement("figure");
    figureElement.id = "selected-image";

    const image = document.createElement("img");
    const imageBlob = new Blob([e.target.result], {type: file.type});
    image.src = URL.createObjectURL(imageBlob);
    image.style.height = "160px";
    figureElement.style.height = "160px";
    previewImg.style.justifyContent = "center";

    figureElement.appendChild(image);
    previewImg.appendChild(figureElement);

    const labelAdd = document.getElementById("label-add");
    labelAdd.style.display = "none"
    const labelAddP = document.getElementById("label-add-p");
    labelAddP.style.display = "none"
};

// maintenant on intègre les catégorie dans le formulaire via le select

const categorySelect = document.getElementById("dropdown");
const emptyOptionSelectCategory = document.createElement("option");
emptyOptionSelectCategory.style.display = "none";
categorySelect.appendChild(emptyOptionSelectCategory);

// la boucle permet de générer les noms de catégories dans les options dans le select

for(let i=0; i < categories.length; i++){
        const optionSelectCategory = document.createElement("option");
        optionSelectCategory.innerText = categories[i].name;
        optionSelectCategory.value = categories[i].id;
        categorySelect.appendChild(optionSelectCategory);
};

// Pour la publication, on prends toutes nos données que l'on stock dans la fonction formData 

const newWorkPhoto = document.querySelector("#pic-file");
const newWorkTitle = document.querySelector("#title");
const newWorkCategory = document.querySelector("#dropdown");
const formu = document.querySelector("#formu");
async function addWork(){
    const newWorkPhotoFile = newWorkPhoto.files[0];
    const newWorkTitleValue = newWorkTitle.value;
    const newWorkCategoryValue = newWorkCategory.value;
    let formData = new FormData();
    formData.append("image", newWorkPhotoFile, newWorkPhotoFile.name);
    formData.append("title", newWorkTitleValue);
    formData.append("category", newWorkCategoryValue); // Après ca, on appel un fetch (POST) pour envoyer un nouveau travail à l'api
    return fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
        "Authorization": `Bearer ${sessionStorage["token"]}`,
    },
    body: formData
    }).then(response => response.json());
    
};

// Pour envoyer ce nouveau travail, il faut donc un bouton submit valide lorsque tous les champs sont remplis sinon le bouton est désactiver
const submitFormAddWork = document.getElementById('validateworkadd');
newWorkPhoto.addEventListener("input" , ()=>{
    if (newWorkPhoto.value.length > 0 || newWorkTitle.value.length > 0 || newWorkCategory.value.length > 0){
        submitFormAddWork.disabled = false;
        submitFormAddWork.style.backgroundColor = "#1D6154";
        
    } else{
        submitFormAddWork.disabled = true;
    }
    
});

// Quand on click sur le bouton submit, on envoie donc le nouveau travail avec ses données, et on viens refresh les traveaux en rajoutant le nouveau rajouté
submitFormAddWork.addEventListener("click", async function(event){
    console.log("sophieWorks")
    event.preventDefault();
    if (newWorkPhoto.files[0] && newWorkTitle.value && newWorkCategory.value){
        await addWork();
        await refreshWorks();
        modalContainer.innerText = "";
        
        alert("Your work has been succesfully added");
        document.querySelector(".gallery").innerHTML = "";
        genererSophieWorks(worksP);
        document.querySelector(".gallery-modal").innerHTML = "";
        generateWorksModal(worksP);
    }else{
        alert("All the fields should be filled");
        return;
    };
});

async function refreshWorks(){
    const answer = await fetch("http://localhost:5678/api/works")
    worksP = await answer.json();
    const worksJSON = JSON.stringify(worksP);
    window.sessionStorage.setItem("worksP", worksJSON);
};

function checkDisabled (){
    return newWorkPhoto.files[0] && newWorkTitle.value && newWorkCategory.value
}