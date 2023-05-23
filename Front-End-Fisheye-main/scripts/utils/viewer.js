function viewerHandler(photographer, mediaItems) {
  const articles = document.querySelectorAll(".cardWrapper");
  const viewer = document.querySelector(".viewerModal");
  const arrowLeftIcon = viewer.querySelector(".leftArrow");
  const arrowRightIcon = viewer.querySelector(".rightArrow");
  const closeIcon = viewer.querySelector(".viewerCloseIcon");

  let direction;
  let mediaIndex;
  let isViewerOpen= false;

  // Check current card
  articles.forEach((article) => {
    const thumb = article.firstElementChild;
    //display viewer if card is clicked
    thumb.addEventListener("click", (e) => {
      mediaIndex = displayViewer(article, photographer, mediaItems);
      isViewerOpen = true;
    });

    // display viewer if Enter is pressed on a focused card.
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        mediaIndex = displayViewer(article, photographer, mediaItems); 
        isViewerOpen = true;
      }
    });
  });

  // check if a specific key is pressed
  document.addEventListener("keydown", (e) => {

      // escape = close the viewer
      if (e.key === "Escape" && isViewerOpen) {
        e.preventDefault();
        viewer.classList.remove("flex");
        viewer.setAttribute("aria-hidden", "true");
        isViewerOpen = false;
      }

      // arrow left = previous media
      if (e.key === "ArrowLeft" && isViewerOpen) {
        direction = "left";
        mediaIndex = arrowsHandle(mediaIndex, mediaItems, direction);
        updateViewer(photographer, mediaItems, mediaIndex);
      }

      // arrow right = next media
      if (e.key === "ArrowRight" && isViewerOpen) {
        direction = "right";
        mediaIndex = arrowsHandle(mediaIndex, mediaItems, direction);
        updateViewer(photographer, mediaItems, mediaIndex);
      }
  });

  // check if one of those icons is clicked
  
  // xmark = close the modal
  closeIcon.addEventListener("click", (e) => {
    viewer.classList.remove("flex");
    viewer.setAttribute("aria-hidden", "true");
    isViewerOpen = false;
  })

  // left arrow = previous media
  arrowLeftIcon.addEventListener("click", (e) => {
    direction = "left";
    mediaIndex = arrowsHandle(mediaIndex, mediaItems, direction);
    updateViewer(photographer, mediaItems, mediaIndex);
  })

  // right arrow = next media
  arrowRightIcon.addEventListener("click", (e) => {
    direction = "right";
    mediaIndex = arrowsHandle(mediaIndex, mediaItems, direction);
    updateViewer(photographer, mediaItems, mediaIndex);
  })
}

// Check the direction find the next or previous mediaItems
function arrowsHandle(mediaIndex, mediaItems, direction) {
  let newIndex = mediaIndex;

  if (direction === "left") {
    newIndex--;
    if (newIndex < 0) {
      newIndex = mediaItems.length - 1;
    }
  }
  if (direction === "right") {
    newIndex++;
    if (newIndex >= mediaItems.length) {
      newIndex = 0;
    }
  }
  return newIndex;
}

function displayViewer(article, photographer, mediaItems) {
  // rebuild the photographer's name to use it on the path
  const name = photographer.name.split(" ")[0]; // split the first part of the name to get the path.

  // get media Id from the article tag, parse it as an integer and use it to find the target object
  const mediaId = parseInt(article.getAttribute("data-id"));
  const mediaIndex = mediaItems.findIndex((obj) => obj.id === mediaId);
  const foundItem = mediaItems[mediaIndex];

  // check foundItem to generate the right media element.
  const { id, title, image, video } = foundItem;
  let content = "";
  content = video
    ? `<video class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${video}" alt="video de ${title}" autoplay loop> </video>
    <h1 class="contentTitle">${title}</h1>`
    : `<img class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="image de ${title}" />
    <h1 class="contentTitle">${title}</h1>`;

  // insert media and title and display in the document
  const contentMedia = document.querySelector(".contentWrapper");
  contentMedia.innerHTML = "";
  contentMedia.innerHTML = content;

  document.querySelector(".viewerModal").classList.add("flex");
  document.querySelector(".viewerModal").removeAttribute("aria-hidden");
  return mediaIndex;
}

function updateViewer(photographer, mediaItems, mediaIndex) {
  // rebuild the photographer's name to use it on the path
  const name = photographer.name.split(" ")[0]; // split the first part of the name to get the path.

  // get media object from mediaItems based on the mediaIndex
  const mediaObject = mediaItems[mediaIndex];

  // check the type of contentMedia to generate the right element.
  const { id, title, image, video } = mediaObject;
  let content = "";
  content = video
    ? `<video class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${video}" alt="video de ${title}" autoplay loop> </video>
    <h1 class="contentTitle">${title}</h1>`
    : `<img class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="image de ${title}" />
    <h1 class="contentTitle">${title}</h1>`;

  // replace the current content with the new content
  const contentMedia = document.querySelector(".contentWrapper");
  contentMedia.innerHTML = "";
  contentMedia.innerHTML = content;
}