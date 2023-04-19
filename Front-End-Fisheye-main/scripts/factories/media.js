function mediaFactory(photographer, mediaItems) {
  const name = photographer.name.split(" ")[0]; //split the first part of the name to get the path.
  const gallery = document.createElement("div");
  gallery.classList.add("galleryWrapper");
  let galleryItems = [];

  mediaItems.forEach((mediaItem) => {
    
    const { image, video, title, likes, id } = mediaItem;

    if (image) {
      const card = `
                <article tabindex="0" data-id="${id}" class="cardWrapper">
                        <img tabindex="0" class="cardImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />
                        <div class="cardInfoWrapper">
                            <p class="cardTitle">${title}</p>
                            <div tabindex="0" class="likesWrapper">
                                <p class="likesNumber">${likes}</p>
                                <img class="likesIcon"src="assets/icons/heart.svg">
                            </div>
                        </div>
                </article>
                `;
      galleryItems += card;
    }
    if (video) {
      const card = `
                <article tabindex="0" data-id="${id}" class="cardWrapper">
                        <video tabindex="0" class="cardVideo" data-id="${id}" src="assets/photographers/${name}/${video}" alt="video of ${title}" ></video>
                        <div class="cardInfoWrapper">
                            <p class="cardTitle">${title}</p>
                            <div tabindex="0" class="likesWrapper">
                                <p class="likesNumber">${likes}</p>
                                <img class="likesIcon"src="assets/icons/heart.svg">
                            </div>
                        </div>
                </article>
                `;
      galleryItems += card;
    }
  });
  gallery.insertAdjacentHTML("afterbegin", galleryItems);
  return gallery;
}

function getUserFooterDOM(photographer, mediaItems) {

  const footerEl = document.createElement("footer");
  footerEl.classList.add("footer");

  let totalLikes = 0;
  const { price } = photographer;

  mediaItems.forEach((mediaItem) => {
    const { likes } = mediaItem;
    totalLikes += likes;
  })
  
  const footer = `
    <div class="footerLikesWrapper"">
      <p class="footerLikesNumber">${totalLikes}</p>
      <img class="footerLikesIcon"src="assets/icons/heart2.svg">
    </div>
    <p class="footerPrice">${price}€/jour</p>
  `
  footerEl.innerHTML = footer;
  return footerEl
}

function getMediaMenu() {
  
  const menuEl = document.createElement("div");
  menuEl.classList.add("sort_relative")
  const chevron = `
                    <svg class="dropdown_svg" id="svg_arrow" viewBox="0 0 10 10" width="20" height="20">
                      <path d="M1 5l4 4 4-4" stroke="white" stroke-linecap="round" stroke-width="1.2" fill="none" />
                    </svg>
                  `

  const menu = `
                <div class="sort_section">
                  <p class="sort_text">Trier par </p>
                  <div id="dropdownWrapper">
                    <div class="dropdown_items_wrapper">
                      <button class="dropdown_item active" data-type="popularity">Popularité</button>
                      <hr>
                      <button class="dropdown_item" data-type="date">Date</button>
                      <hr>
                      <button class="dropdown_item" data-type="title">Titre</button>
                    </div>
                    ${chevron}
                  </div>
                </div>     
              `
  menuEl.innerHTML = menu;

  return menuEl;
}

function createViewer(photographer, mediaItems, foundItem) {

  const { id, title, image, video } = foundItem;
  const name = photographer.name.split(" ")[0]; // split the first part of the name to get the path.

  // check the type of contentMedia to generate the right element.
  let contentMedia = "";
  video?contentMedia = `<video class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${video}" alt="picture of ${title}" autoplay loop </video>`:
    contentMedia = `<img class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />`;
  
  // graphic elements (arrow, Xmark)
  const svgArrow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#901C1C" stroke="none" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`;
  const closeViewerIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#901C1C" stroke="none" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
  
  // generate the viewer
  let viewerModal = []; 
  viewerModal = `
                  <div class="viewerWrapper">
                    <div class="leftArrow arrow" data-direction="left">${svgArrow}</div>
                    <div class="contentWrapper">
                      ${contentMedia}
                      <h1 class="contentTitle">${title}</h1>
                    </div>
                    <div class="rightArrow arrow" data-direction="right">${svgArrow}</div>
                    <div class="viewerCloseIcon">${closeViewerIcon}</div>
                  </div>
                `;

  return viewerModal;
}