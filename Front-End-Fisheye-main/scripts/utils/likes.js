function likesHandler(mediaItems) {
    //_________________________________________________________________//
    //                          DOM SELECTORS AND VARIABLES            //
    //_________________________________________________________________//

    // select all the media cards
    const mediaCardEl = document.querySelectorAll(".cardWrapper");

    // select the footer's total likes count
    const totalLikesEl = document.querySelector(".footerLikesNumber");
    const totalLikesIcon = document.querySelector(".footerLikesIcon");
    let totalLikes = parseInt(totalLikesEl.textContent);


    //_________________________________________________________________//
    //                          LIKES MECHANICS                        //
    //_________________________________________________________________//
    
    // check each media card 
    mediaCardEl.forEach((cardEl) => {
        
        //inside each card, select the likes wrapper and the number of likes
        const likesWrapperEl = cardEl.querySelector(".likesWrapper");
        const likesNumberEl = likesWrapperEl.querySelector(".likesNumber");
        const likesIcon = likesWrapperEl.querySelector(".likesIcon");
        // parse the Likes number as an integer
        let likes = parseInt(likesNumberEl.textContent);
        
        // to prevent user to like more than once
        let hasLiked = false;

        // if likes clicked 
        // likes toggle
        likesWrapperEl.addEventListener("click", (e) => {
            e.preventDefault();
            likesToggle();
        })
        // if Enter is pressed
        // while likes is focus
        // toggle likes
        likesWrapperEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.stopPropagation();
                e.preventDefault();     
                likesToggle();
            }
        })


    //_________________________________________________________________//
    //                          FUNCTION                               //
    //_________________________________________________________________//

        function likesToggle() {
            if (!hasLiked) {  
                likes ++;
                totalLikes ++ ;
                likesIcon.classList.add("shake");
                totalLikesIcon.classList.add("shake");
        
                hasLiked = true   
            } else {
                likes --;
                totalLikes -- ;
                likesIcon.classList.add("shake");
                totalLikesIcon.classList.add("shake");
        
                hasLiked = false;
            }      
            // Display the updated likes count and totalLikes count
            likesNumberEl.textContent = likes; 
            totalLikesEl.textContent =  totalLikes;
        
            // Remove the "shake" class after .5 second
            setTimeout(() => {
                likesIcon.classList.remove("shake");
                totalLikesIcon.classList.remove("shake");
            }, 500);
        }   
    })
}