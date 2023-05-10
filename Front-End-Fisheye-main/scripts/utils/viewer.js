function viewerHandler(photographer, mediaItems) {
  const articles = document.querySelectorAll(".cardWrapper");
  const viewer = document.querySelector(".viewerModal");
  const arrowLeftIcon = viewer.querySelector(".leftArrow");
  const arrowRightIcon = viewer.querySelector(".rightArrow");
  const closeIcon = viewer.querySelector(".viewerCloseIcon");
  const video = viewer.querySelector("video");

  let direction;
  let mediaIndex;
  let spaceCounter = 0;
  let savedTime = 0;
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
        e.preventDefault();
        //e.stopPropagation();
        mediaIndex = displayViewer(article, photographer, mediaItems); 
        isViewerOpen = true;
      }
    });
  });

  // check if a specific key is pressed
  document.addEventListener("keydown", (e) => {
      e.preventDefault();
      //e.stopPropagation();

      // escape = close the viewer
      if (e.key === "Escape" && isViewerOpen) {
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

      // pause and resume if video=true
      if (video !== null && isViewerOpen) {
        console.log("ok")
        if (e.code === "Space") {
          e.preventDefault();
          spaceCounter++;
          // first hit will pause the video, the second hit will resume video and so on...
          if (spaceCounter % 2 === 0) {
            video.currentTime = savedTime;
            video.play();
          } else {
            video.pause();
            savedTime = video.currentTime;
          }
          console.log(spaceCounter);
        }
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
};

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
  console.log("opening modal and displaying the media for the first time")
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
  console.log("updated");
}