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

    const dropMenu = getMediaMenu(); // get the dropmenu model
    mainSection.appendChild(dropMenu);  // display the menu model

    dropdownMenuHandler(photographer, mediaItems); // handling the dropdown menu filter 

    const gallery = mediaFactory(photographer, mediaItems); // get the gallery model
    mainSection.appendChild(gallery); // display the gallery model

    const footer = getUserFooterDOM(photographer, mediaItems); // get footer model
    mainSection.appendChild(footer); //display the footer model 
    
    previewVideo();
    likesHandler(mediaItems); // handling the likes' behavior
    viewerHandler(photographer, mediaItems);
}

async function init() {
    document.addEventListener("keydown", (e)=>{
        if (e.key=== "Tab") {
            console.log("tab");
        }
    })
    const photographer = await getPhotographer(idValue); // get users Data from "server side"
    displayData(photographer);   
}

init();