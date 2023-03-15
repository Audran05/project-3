async function getWorks () { 
    const reponse = await fetch ("http://localhost:5678/api/works");
    const works = await reponse.json();
    return Promise.resolve(works)
};



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

async function getCategories () { 
    const reponse = await fetch ("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    return Promise.resolve(categories)
}

const categories = await getCategories()
categories.forEach(cat =>{
    console.log(cat)
})






for (let i = 0; i< categories.length; i++){
    const cat = categories[i];
    const filtres = document.querySelector('.filters');
    const allButton = document.querySelector('.all');
    let buttonFiltrer = document.createElement("button");
    buttonFiltrer.innerText = categories[i].name;
    filtres.appendChild(buttonFiltrer);
    
    buttonFiltrer.addEventListener("click",function(){
        const sophieWorksFiltrer = sophieWorks.filter(sophieWork=>sophieWork.categoryId === cat.id)
        document.querySelector(".gallery").innerHTML = '';
        genererSophieWorks(sophieWorksFiltrer);
    })
    allButton.addEventListener('click',function(){
        document.querySelector(".gallery").innerHTML = '';
        genererSophieWorks(sophieWorks);
    })
}



let myForm = document.getElementById('myform');
let email = document.getElementById('email');
let passWord = document.getElementById('pass');
let submitB = document.getElementById('send');





