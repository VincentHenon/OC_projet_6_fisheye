// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");
    const photographers = await response.json();
    console.log(photographers);
    return photographers;
  } catch (error) {
    console.error(error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log( photographers );
  displayData(photographers);
}

init();

/*let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }*/

//export const { photographers };
