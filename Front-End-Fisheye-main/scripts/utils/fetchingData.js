//___________________________________________________________//
//                        FUNCTIONS                          //
//___________________________________________________________//

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

// Then get the photographer by finding its id...   
async function getPhotographer(idValue) {
    const data = await getPhotographers();
    const photographers = data.photographers;
    const photographer = photographers.find(obj => obj.id === idValue); // returns the first element with the ID.
    if (!photographer) { // handle the case where photographer is not found
      const main = document.getElementById("main");  
      const error = `<div class="error_404_wrapper"><h2 class="error_404_big">Oups! Erreur 404!</h2>
                    <h3 class="error_404_medium">Ce photographe n'existe pas...</h3>
                    <p class="error_404_small">Veuillez choisir un autre photographe.</p>
                    <button class="error_404_btn" aria-label="Ce bouton renvoie à la page d'acceuil" onclick="window.location.href = '/'" >Accueil</button></div>`
      main.innerHTML= error;
      return null
    }
    return photographer;
}

// ...and get the media data
async function getMedia(idValue) {
    const data = await getPhotographers();
    const mediaItems = data.media.filter(itm => itm.photographerId === idValue); // filter every items with the user ID.
    return mediaItems;
}