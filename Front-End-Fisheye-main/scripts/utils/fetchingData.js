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
    return photographer;
}

// ...and get the media data
async function getMedia(idValue) {
    const data = await getPhotographers();
    const mediaItems = data.media.filter(itm => itm.photographerId === idValue); // filter every items with the user ID.
    return mediaItems;
}