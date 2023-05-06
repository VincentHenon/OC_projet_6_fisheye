//_________________________________________________________________//
//                          DOM SELECTORS AND VARIABLES            //
//_________________________________________________________________//

const mainEl = document.querySelector("#main");
const headerEl = document.querySelector(".user_header");
const modal = document.getElementById("contact_modal");
const modalHeader = modal.getElementsByTagName("h2");
const contactBtn = document.querySelector(".contact_button");
const closeIcon = document.querySelector(".closeIcon");
const sendBtn = document.getElementById("sendBtn");
const nameEl = document.getElementById("profileName")
console.log(mainEl);
console.log(headerEl);

/*const newTitle= modalHeader.innerHTML = `<h2>Contactez-moi<br>${name}</h2>`
console.log(newTitle);*/

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
    modal.removeAttribute("aria-hidden")
    mainEl.setAttribute("aria-hidden", "true");
    headerEl.setAttribute("aria-hidden", "true");
    
    
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    mainEl.removeAttribute("aria-hidden");
    headerEl.removeAttribute("aria-hidden");
}

function displayData(photographer) {
    const { name } = photographer;
    const modalEl = document.getElementById("contact_modal");
    const modalTitle = modalEl.querySelector("h2");
    modalTitle.innerHTML = `<h2>Contactez-moi</h2><h2>${name}</h2>`;
}
