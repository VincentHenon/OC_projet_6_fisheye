function viewerHandler(photographer, mediaItems) {
  const articles = document.querySelectorAll(".cardWrapper");
  // Check current card
  articles.forEach((article) => {
    const thumb = article.firstElementChild;
    const focusEl = article.querySelector(":focus");

    //display viewer if card is clicked
    thumb.addEventListener("click", (e) => {
      displayViewer(article, photographer, mediaItems);
    });

    // display viewer if Enter is pressed on a focused card.
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        displayViewer(article, photographer, mediaItems);
      }
    });
  });
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
    ? `<video class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${video}" alt="picture of ${title}" autoplay loop </video>
    <h1 class="contentTitle">${title}</h1>`
    : `<img class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />
    <h1 class="contentTitle">${title}</h1>`;

  // insert media and title and display in the document
  const contentMedia = document.querySelector(".contentWrapper");
  const temp = document.createElement("div");
  temp.innerHTML = content;
  const contentEl = temp;
  contentMedia.innerHTML = "";
  contentMedia.appendChild(contentEl);

  document.querySelector(".viewerModal").classList.add("flex");
  document.querySelector(".viewerModal").removeAttribute("aria-hidden");

  // function to handle viewer's functionnalities

  viewerMechanics(photographer, mediaIndex, mediaItems);
}

function viewerMechanics(photographer, mediaIndex, mediaItems) {
  const arrows = document.querySelectorAll(".arrow");
  const viewer = document.querySelector(".viewerModal");
  const viewerWrapper = document.querySelector(".viewerWrapper");
  const closeIcon = document.querySelector(".viewerCloseIcon");
  const video = viewer.querySelector("video");

  let spaceCounter = 0;
  let savedTime = 0;

  // check if key pressed is Escape or Space
  document.addEventListener("keydown", (e) => {
    // close the viewer
    if (e.key === "Escape") {
      viewer.classList.remove("flex");
      viewer.setAttribute("aria-hidden", "true");
    }
    // pause and resume video
    if (e.code === "Space" && video) {
      e.preventDefault();
      spaceCounter++;
      //first hit will pause the video, the second hit will resume video
      if (spaceCounter % 2 === 0) {
        console.log("video is playing");
        video.currentTime = savedTime;
        video.play();
      } else {
        video.pause();
        savedTime = video.currentTime;
        console.log("video is paused");
      }
    }
  });

  arrows.forEach((arrow) => {
    let direction = arrow.getAttribute("data-direction");

    // change index if arrows are clicked
    arrow.addEventListener("click", (e) => {
      mediaIndex = arrowsHandle(
        photographer,
        mediaIndex,
        mediaItems,
        arrow,
        e,
        direction
      );
      updateViewer(photographer, mediaItems, mediaIndex);
    });

    // close modal on xmark click or esc key
    closeIcon.addEventListener("click", (e) => {
      viewer.classList.remove("flex");
      viewer.setAttribute("aria-hidden", "true");
    });

    // key pressed
    document.addEventListener("keydown", (e) => {
      console.log("isPressed is false");

      if (e.key === "ArrowLeft" && !isPressed) {
        isPressed = true;
        console.log("isPressed is true");
        console.log("3-1) key is pressed");
        direction = "left";
        mediaIndex = arrowsHandle(
          photographer,
          mediaIndex,
          mediaItems,
          arrow,
          e,
          direction
        );
      } else if (e.key === "ArrowRight" && !isPressed) {
        isPressed = true;
        console.log("isPressed is true");
        console.log("3-1) key is pressed");
        direction = "right";
        mediaIndex = arrowsHandle(
          photographer,
          mediaIndex,
          mediaItems,
          arrow,
          e,
          direction
        );
      }
    });

    // to prevent auto-repeat
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") {
        console.log("3-2) RIGHT key is no more pressed");
        updateViewer(photographer, mediaItems, mediaIndex);
        isPressed = false;
      } else if (e.key === "ArrowLeft") {
        console.log("3-2) LEFT key is no more pressed");
        updateViewer(photographer, mediaItems, mediaIndex);
        isPressed = false;
      }
    });
  });

  spaceCounter = 0;
  console.log("3) ends viewerMechanics");
}

function arrowsHandle(
  photographer,
  mediaIndex,
  mediaItems,
  arrow,
  e,
  direction
) {
  let newIndex = mediaIndex;
  console.log("4) starts arrowsHandle");
  //if left arrow clicked
  if (direction === "left") {
    console.log("4-1) direction is LEFT");
    console.log(mediaIndex);
    console.log("-1");
    newIndex--;
    if (newIndex < 0) {
      console.log("4-2) index is < 0");
      newIndex = mediaItems.length - 1;
    }
    // return the updated index
  }
  if (direction === "right") {
    console.log("4-1) direction is RIGHT");
    console.log(mediaIndex);
    console.log("+1");
    newIndex++;
    if (newIndex >= mediaItems.length) {
      console.log("4-2) index is > media length");
      newIndex = 0;
    }
    // return the updated index
  }
  console.log("4) ends arrowsHandle");
  return newIndex;
}

function updateViewer(photographer, mediaItems, mediaIndex) {
  console.log("5) starts updateViewer");
  // rebuild the photographer's name to use it on the path
  const name = photographer.name.split(" ")[0]; // split the first part of the name to get the path.

  // get media object from mediaItems based on the mediaIndex
  const mediaObject = mediaItems[mediaIndex];

  // check the type of contentMedia to generate the right element.
  const { id, title, image, video } = mediaObject;
  let content = "";
  content = video
    ? `<video class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${video}" alt="picture of ${title}" autoplay loop </video>
    <h1 class="contentTitle">${title}</h1>`
    : `<img class="viewerImg" data-id="${id}" src="assets/photographers/${name}/${image}" alt="picture of ${title}" />
    <h1 class="contentTitle">${title}</h1>`;

  // replace the current content with the new content
  const contentMedia = document.querySelector(".contentWrapper");
  contentMedia.innerHTML = "";
  contentMedia.innerHTML = content;
  console.log("5) ends updateViewer");
}

//mettre les events listeners a la base du code => viewerHandler() !!!!!!!
