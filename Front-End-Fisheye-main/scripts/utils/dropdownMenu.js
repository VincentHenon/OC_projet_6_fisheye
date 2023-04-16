// 1_ scan all buttons
// 2_ check which one is clicked on,
// 3_ make it active by changing its class
// 4_ and make the other ones non active.
// 5_ then get the data attribute of the active button
// 6_ and quickreload the DOM and sort the media list accordingly. method sortOf()

function dropdownMenuHandler(photographer, mediaItems) {

  let sortedMediaItems;

  const dropdownWrapper = document.getElementById("dropdownWrapper");
  const dropdownItemsWrapper = dropdownWrapper.querySelector(".dropdown_items_wrapper");
  const dropdownItems = dropdownItemsWrapper.querySelectorAll(".dropdown_item");
  const dropdownArrow = document.getElementById("svg_arrow");
  const dropdownSeparator = dropdownItemsWrapper.querySelectorAll("hr");

  // when the mouse hovers the element
  dropdownWrapper.addEventListener("mouseenter", showMenu);

  // when the mouse leaves the element
  dropdownWrapper.addEventListener("mouseleave", hideMenu);

  // when one of the elements is clicked
  dropdownItems.forEach((item) => {
    // When menu's button is clicked
    item.addEventListener("click", (e) => {
      handlingClick(item, e);
    });
    // When click is released
    item.addEventListener("mouseup", hideMenu);
    
    // sort the gallery by default (popularity) only when the page is loaded
    if(item && mediaItems) { 
        if (item.classList.contains("active")) {
            // sort mediaItems
            mediaItems = sortMedia(item, mediaItems);
            // update the DOM
            return mediaItems;
        }
    }
  });

  //___________________________________________________________//

  function handlingClick(item, e) {
    e.preventDefault();

    // non clicked items are hidden and get the active class removed
    dropdownItems.forEach((el) => {
      if (el !== item && el.classList.contains("active")) {
        el.classList.remove("active");
        el.style.display = "none";
      }
    });
    // clicked item is toggled active
    if (!item.classList.contains("active")) {
      item.classList.add("active");
    }
    // sort mediaItems
    sortedMediaItems = sortMedia(item, mediaItems);
    // update the DOM
    updateGallery(photographer, sortedMediaItems);
  }

  function showMenu() {
    // display non-active buttons
    dropdownItems.forEach((item) => {
      if (!item.classList.contains("active")) {
        item.style.display = "block";
      }
    });

    // Display <hr>
    dropdownSeparator.forEach((separator) => {
      separator.style.display = "block";
    });

    // Rotate arrow
    dropdownArrow.style.transform = "rotate(180deg)";
  }

  function hideMenu() {
    // hide non-active buttons
    dropdownItems.forEach((item) => {
      if (!item.classList.contains("active")) {
        item.style.display = "none";
      }
    });

    // remove <hr>
    dropdownSeparator.forEach((separator) => {
      separator.style.display = "none";
    });

    // cancel arrow's rotation
    dropdownArrow.style.transform = "rotate(0)";
  }

  function sortMedia(item, mediaItems) {
    const value = item.getAttribute("data-type");
    let sortedItems;

    switch (value) {
      case "popularity":
        console.log("popularity");
        sortedItems = mediaItems.sort((a, b) => b.likes - a.likes);
        return sortedItems;

      case "date":
        console.log("date");
        sortedItems = mediaItems.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        return sortedItems;

      case "title":
        console.log("title");
        sortedItems = mediaItems.sort((a, b) => a.title.localeCompare(b.title));
        return sortedItems;
    }
  }

  function updateGallery(photographer, sortedMediaItems) {
    // regenerate gallery and footer
    const gallery = mediaFactory(photographer, sortedMediaItems);
    const footer = getUserFooterDOM(photographer, sortedMediaItems);

    // replace old HTML with updated HTML in the DOM
    const galleryWrapper = document.querySelector(".galleryWrapper");
    const footerWrapper = document.querySelector(".footer");
    galleryWrapper.parentNode.replaceChild(gallery, galleryWrapper);
    footerWrapper.parentNode.replaceChild(footer, footerWrapper);
  }
}
