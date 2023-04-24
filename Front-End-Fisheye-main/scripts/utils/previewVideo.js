function previewVideo() {
    const articles = document.querySelectorAll(".cardWrapper");
  
    articles.forEach(article => {
      const video = article.querySelector("video");
      let savedTime = 0; // Initialize the saved time to 0
  
      if (video) {
        article.addEventListener("mouseenter", () => {
          if (video.currentTime === 0) { // Check if the current time is 0
            video.play();
          } else {
            video.currentTime = savedTime; // Resume the video from the saved time
            console.log(savedTime);
            video.play();
          }
        });
  
        article.addEventListener("mouseleave", () => {
          savedTime = video.currentTime; // Save the current time
          console.log(savedTime);
          video.pause();
        });
      }
    });
  }
  