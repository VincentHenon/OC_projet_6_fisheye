function viewerHandler(photographer, mediaItems) {
    const articles = document.querySelectorAll(".cardWrapper");

    articles.forEach((article)=> {
        const thumb = article.firstElementChild;
        thumb.addEventListener("click", (e) => {
            
            e.preventDefault();

            // get media Id from the article tag, parsed it as integer and use it to find the target object
            const mediaId = parseInt(article.getAttribute("data-id"));
            const mediaIndex = mediaItems.findIndex((obj) => obj.id === mediaId);
            console.log("found Index is ", mediaIndex);
            const foundItem = mediaItems[mediaIndex];

            // create the viewer and display it
            const viewer = createViewer(photographer, mediaItems, foundItem);
            
            // display the viewer in DOM
            const mainSection = document.getElementById("main");
            const viewerModalEl = document.createElement("div");
            viewerModalEl.classList.add("viewerModal");
            viewerModalEl.innerHTML = viewer;
            mainSection.appendChild(viewerModalEl);

            // function to handle buttons
            viewerMechanics(photographer, mediaIndex, mediaItems);
        })
    })
}

function viewerMechanics(photographer, mediaIndex, mediaItems) {
    let newIndex = mediaIndex;
    console.log("old mediaIndex", mediaIndex);
    console.log("mediaItems length", mediaItems.length);

    //select arrows from viewer
    const arrows = document.querySelectorAll(".arrow");

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        
        const direction = arrow.getAttribute("data-direction");
        
        //if left arrow clicked
        if (direction === "left") {
            if (mediaIndex > 0) {
                newIndex--;
            } else {
                newIndex = mediaItems.length - 1;
            }

        //if right arrow clicked
        } else if (direction === "right") {
            if (mediaIndex < mediaItems.length - 1) {
                newIndex++;
            } else {
                newIndex = 0;
            }
        }
        mediaIndex = newIndex;
        console.log("new mediaIndex", mediaIndex);
        //update the viewer content.
        updateViewer(photographer, mediaItems, mediaIndex);
      });
    });
  }

  function updateViewer(photographer, mediaItems, mediaIndex) {
    const viewer = document.querySelector(".contentWrapper");
    const media = viewer.firstElementChild;
    const { id, title, image, video } = mediaItems[mediaIndex];

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

    // display the viewer in DOM
    const mainSection = document.getElementById("main");
    const viewerModalEl = document.createElement("div");
    viewerModalEl.classList.add("viewerModal");
    viewerModalEl.innerHTML = viewerModal;
    mainSection.appendChild(viewerModalEl);  
  }