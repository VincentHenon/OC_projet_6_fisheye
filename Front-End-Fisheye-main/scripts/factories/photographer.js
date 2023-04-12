function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      //create unique Url for each photographer
      const photographerUrl = `photographer.html?id=${id}`

      // Create HTML tags
      const articleEl = document.createElement("article");
      const linkEl = document.createElement("a");
      const profileEl = document.createElement("div")
      const img = document.createElement("img");
      const infosEl = document.createElement("div");
      const locationEl = document.createElement("p");
      const taglineEl = document.createElement("p");
      const priceEl = document.createElement("p");
      const nameEl = document.createElement("h2");
      
      // Set attributes
      linkEl.setAttribute("href", photographerUrl); //link to photographer
      img.setAttribute("src", picture);
      img.setAttribute("alt", `picture of ${name}`);

      // positionning elements inside the first part of the card
      articleEl.appendChild(profileEl);
      profileEl.appendChild(linkEl);
      linkEl.appendChild(img);
      linkEl.appendChild(nameEl);
      
      // Create Classes
      profileEl.classList.add("profile");
      img.classList.add("profileImg");
      infosEl.classList.add("infos");
      locationEl.classList.add("infos-location");
      taglineEl.classList.add("infos-tagline")
      priceEl.classList.add("infos-price");
  
      // Add text
      locationEl.textContent = `${city}, ${country}`;
      taglineEl.textContent = `"${tagline}"`;
      priceEl.textContent = `${price}€/jour`;
      nameEl.textContent = name;

      // Positionning elements inside the lower part of the card
      infosEl.appendChild(locationEl);
      infosEl.appendChild(taglineEl);
      infosEl.appendChild(priceEl);
      articleEl.appendChild(infosEl);

      return articleEl;
    }
  
    return { name, picture, getUserCardDOM };
  }