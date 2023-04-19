//_________________________________________________________________//
//                          DOM SELECTORS AND VARIABLES            //
//_________________________________________________________________//

const modal = document.getElementById("contact_modal");
const contactBtn = document.querySelector(".contact_button");
const closeIcon = document.querySelector(".closeIcon");
const sendBtn = document.getElementById("sendBtn");


//_________________________________________________________________//
//                          FORM INTERACTIONS                      //
//_________________________________________________________________//

// if closeIcon is focus 
// and the key Enter is pressed 
// modal closes
closeIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        closeModal();
    }
})

// if key Escape is pressed while modal focuses
// modal closes
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
})

// if closeIcon is clicked 
// modal closes
closeIcon.addEventListener("click", (e) => {
    (e).preventDefault();    
    closeModal();
})

// send button handler
sendBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("formulaire validé!");
    closeModal();
})


//___________________________________________________________//
//                        FUNCTIONS                          //
//___________________________________________________________//

function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function displayData(photographer) {
    const { name } = photographer;
    const modalEl = document.getElementById("contact_modal");
    const modalTitle = modalEl.querySelector("h2");
    modalTitle.innerHTML = `<h2>Contactez-moi</h2><h2>${name}</h2>`;
}
