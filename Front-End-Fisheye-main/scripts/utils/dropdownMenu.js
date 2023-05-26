function dropdownMenuHandler(photographer, mediaItems) {

    //_________________________________________________________________//
    //                          DOM SELECTORS AND VARIABLES            //
    //_________________________________________________________________//

    let sortedMediaItems;

    const dropdownWrapper = document.getElementById("dropdownWrapper");
    const dropdownItemsWrapper = dropdownWrapper.querySelector(".dropdown_items_wrapper");
    const dropdownItems = dropdownItemsWrapper.querySelectorAll(".dropdown_item");
    const chevron = document.getElementById("svg_arrow");

    //_________________________________________________________________//
    //                          MENU MECHANICS                         //
    //_________________________________________________________________//

    // when one of the elements is clicked
    dropdownItems.forEach((item) => {

        // When menu's button is clicked
        item.addEventListener("click", (e) => {
        handlingClick(item, e);
        });
        
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

    // if chevron is focused and keydown Enter is pressed the menu opens
    chevron.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            dropdownWrapper.classList.add("displayMenu");
        }
    })

    // if close the menu if opened when pressing escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
                dropdownWrapper.classList.remove("displayMenu");
            }
    })


    //___________________________________________________________//
    //                        FUNCTIONS                          //
    //___________________________________________________________//

    function handlingClick(item, e) {
        e.preventDefault();

        //remove active class from the items
        const activeItem = dropdownItemsWrapper.querySelector(".active");
        activeItem.classList.remove("active");
        //add active class to the clicked item
        item.classList.add("active");

        // sort mediaItems
        sortedMediaItems = sortMedia(item, mediaItems);

        // update the DOM
        updateGallery(photographer, sortedMediaItems);
    }

    function sortMedia(item, mediaItems) {
        // find which buttons has been clicked
        const value = item.getAttribute("data-type");
        let sortedItems;

        // different cases for sorting out the media cards
        switch (value) {
        case "popularity":
            sortedItems = mediaItems.sort((a, b) => b.likes - a.likes);
            return sortedItems;

        case "date":
            sortedItems = mediaItems.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
            );
            return sortedItems;

        case "title":
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

        likesHandler(sortedMediaItems);
        viewerHandler(photographer, sortedMediaItems);
    }
}
