//Mettre le code JavaScript lié à la page photographer.html

// #1 get the current URL and his params. #2 get the value of the string "id" from the URL.
const currentURLParams = new URL(window.location.href).searchParams;
const idValue  = parseInt(currentURLParams.get("id")); // convert it as a number.

// Finally display the whole thing
async function displayData(photographer) {

    const mainSection = document.getElementById("main");// select the tag "main"
    const photographerModel = photographerFactory(photographer) // get the photographer model

    const header = photographerModel.getUserHeaderDOM(); // get the header HTML
    mainSection.appendChild(header); // display the header model
    
    const mediaItems = await getMedia(idValue); // get media Data from serverside

    const dropMenu = getMediaMenu(mediaItems);
    mainSection.appendChild(dropMenu);

    dropdownMenuHandler(photographer, mediaItems);

    const gallery = mediaFactory(photographer, mediaItems); // get the gallery model
    mainSection.appendChild(gallery); // display the gallery model

    const footer = getUserFooterDOM(photographer, mediaItems); // get footer model
    mainSection.appendChild(footer); //display the footer model 
    
}

async function init() {
    const photographer = await getPhotographer(idValue); // get users Data from "server side"
    displayData(photographer);   
}

init();

//export { photographer };