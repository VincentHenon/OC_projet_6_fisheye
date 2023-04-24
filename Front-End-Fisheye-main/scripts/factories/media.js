function mediaFactory(photographer, mediaItems) {
  const name = photographer.name.split(" ")[0]; //split the first part of the name to get the path.
  const gallery = document.createElement("div");
  gallery.classList.add("galleryWrapper");
  let galleryItems = [];

  mediaItems.forEach((mediaItem) => {
    
    const { image, video, title, likes, id } = mediaItem;

    if (image) {
      const card = `
                <article tabindex="2" data-id="${id}" class="cardWrapper">
                        <div class="overflow_media">
                          <img class="cardImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />
                        </div>
                        <div class="cardInfoWrapper">
                            <p class="cardTitle">${title}</p>
                            <div tabindex="2" class="likesWrapper">
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
                    <article tabindex="2" data-id="${id}" class="cardWrapper">
                      <div class="overflow_media">
                        <video class="cardVideo" data-id="${id}" src="assets/photographers/${name}/${video}" alt="video of ${title}" ></video>                    
                      </div>
                      <div class="cardInfoWrapper">
                        <p class="cardTitle">${title}</p>
                        <div tabindex="2" class="likesWrapper">
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