//import { getPhotographers } from "./index.js"
//Mettre le code JavaScript lié à la page photographer.html

// récupérer l'id de la page pour trier dans le JSON les données à recupérer.
// Afficher les éléments

// #1 get the current URL and his params. #2 get the value of the string "id" from the URL.
const currentURLParams = new URL(window.location.href).searchParams;
const idValue  = currentURLParams.get("id"); 


// first get the list of the photographers
async function getPhotographers() {
        try {
          const response = await fetch('./data/photographers.json');
          const data = await response.json();
          
          return data;
        } catch (error) {
          console.error(error);
        }
      }
// Then get the photographer by finding its id      
async function getPhotographer() {
    const data = await getPhotographers();
    const photographers = data.photographers;
    const photographer = photographers.find(obj => obj.id === parseInt(idValue)); // parseInt the idValue to make this works.
    console.log(photographer);
    return photographer;
}

async function getMedia() {
    const data = await getPhotographers();
    const mediaItems = data.media.filter(itm => itm.photographerId === parseInt(idValue));
    return mediaItems;
}

function displayHeader(photographer) {
    const name = photographer.name;
    const location = photographer.city + "," + photographer.country;
    const tagline = photographer.tagline;

    const portrait = photographer.portrait;
    const picture = `assets/photographers/${portrait}`;
    
    const photographHeader = document.querySelector(".photograph-header");
    const contactBtn = document.getElementById("contactBtn");
    const mainSection = document.getElementById("main");

    const profileInfo = 
    `<div class="profileInfo">
        <h1 id="profileName">${name}</h1>
        <p class="infoLocation">${location}</p>
        <p class="infoTagline">${tagline}</p>
    </div>
    <button id="contactBtn"class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img src="${picture}" alt= "picture of ${name}" class="profileImg"/>
    `
    photographHeader.innerHTML = profileInfo;

    /*const profileInfoEl = document.createElement("div");
    const infoNameEl = document.createElement("h1");
    const infoLocationEl = document.createElement("p");
    const infoTaglineEl = document.createElement("p");
    const profileImgEl = document.createElement("img");
    const orderEl = document.createElement("div")
    const orderTextEl = document.createElement("p");
    const orderSelectEl = document.createElement("select");
    const orderOption1El = document.createElement("option");
    const orderOption2El = document.createElement("option");
    const orderOption3El = document.createElement("option");
    const horizontalLineEl = document.createElement("hr");

    profileInfoEl.classList.add("profileInfo", "header_item");
    infoNameEl.setAttribute("id", "profileName");
    infoLocationEl.classList.add("infoLocation");
    infoTaglineEl.classList.add("infoTagline");
    profileImgEl.classList.add("profileImg");
    orderEl.classList.add("orderWrapper");

    profileImgEl.setAttribute("src", picture);
    profileImgEl.setAttribute("alt", `picture of ${name}`);
    orderOption1El.setAttribute("value", "popularity");
    orderOption2El.setAttribute("value", "date");
    orderOption3El.setAttribute("value", "title");

    infoNameEl.textContent = name;
    infoLocationEl.textContent = `${photographer.city}, ${photographer.country}`;
    infoTaglineEl.textContent = photographer.tagline;
    orderTextEl.textContent = "Trier par ";
    orderOption1El.textContent = "Popularité";
    orderOption2El.textContent = "Date";
    orderOption3El.textContent = "Titre";

    profileInfoEl.appendChild(infoNameEl);
    profileInfoEl.appendChild(infoLocationEl);
    profileInfoEl.appendChild(infoTaglineEl);

    photographHeader.appendChild(profileInfoEl);
    photographHeader.appendChild(profileImgEl);

    mainSection.appendChild(orderEl);
    orderEl.appendChild(orderTextEl);
    orderEl.appendChild(orderSelectEl);
    orderSelectEl.appendChild(orderOption1El);
    orderSelectEl.appendChild(horizontalLineEl);
    orderSelectEl.appendChild(orderOption2El);
    orderSelectEl.appendChild(horizontalLineEl);
    orderSelectEl.appendChild(orderOption3El);
    orderSelectEl.appendChild(horizontalLineEl);*/
}

function displayGallery(photographer, mediaItems) {

    const name = photographer.name.split(' ')[0]; //split the first part of the name to get the path.
    const gallery = document.createElement("div");
    gallery.classList.add("galleryWrapper");
    const mainSection = document.getElementById("main");
    let galleryItems = [];

    /*for (let i = 0; i < mediaItems.length; i++) {
        
        const mediaItem = mediaItems[i];
        const image = mediaItem.image;
        const title = mediaItem.title;
        const likes = mediaItem.likes;
        console.log(image);
        const card = `
        <article class="cardWrapper">
                <img class="cardImg" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />
                <div class="cardInfoWrapper">
                    <p class="cardTitle">${title}<p>
                    <div class="likesWrapper">
                        <p class="likesNumber">${likes}</p>
                        <img class="likesIcon"src="assets/icons/heart.svg">
                    </div>
                </div>
        </article>
        `
        galleryItems += card;
    }*/

    mediaItems.forEach((mediaItem) => {
        const image = mediaItem.image;
        const video = mediaItem.video;
        const title = mediaItem.title;
        const likes = mediaItem.likes;

        if (image) {
            const card = `
            <article class="cardWrapper">
                    <img class="cardImg" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />
                    <div class="cardInfoWrapper">
                        <p class="cardTitle">${title}<p>
                        <div class="likesWrapper">
                            <p class="likesNumber">${likes}</p>
                            <img class="likesIcon"src="assets/icons/heart.svg">
                        </div>
                    </div>
            </article>
            `
            galleryItems += card;
        }
        if (video) {
            const card = `
            <article class="cardWrapper">
                    <video class="cardVideo" src="assets/photographers/${name}/${video}" alt="video of ${title}" ></video>
                    <div class="cardInfoWrapper">
                        <p class="cardTitle">${title}<p>
                        <div class="likesWrapper">
                            <p class="likesNumber">${likes}</p>
                            <img class="likesIcon"src="assets/icons/heart.svg">
                        </div>
                    </div>
            </article>
            `
            galleryItems += card;
        }  
    });

    gallery.insertAdjacentHTML("afterbegin", galleryItems);
    mainSection.appendChild(gallery);
}

async function init() {
    const photographer = await getPhotographer();
    displayHeader(photographer);
    const mediaItems = await getMedia();
    displayGallery(photographer, mediaItems);
}

init();