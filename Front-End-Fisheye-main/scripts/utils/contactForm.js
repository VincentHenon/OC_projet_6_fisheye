//_________________________________________________________________//
//                          DOM SELECTORS AND VARIABLES            //
//_________________________________________________________________//

const mainEl = document.querySelector("#main");
const headerEl = document.querySelector(".user_header");
const modal = document.getElementById("contact_modal");
const closeIcon = document.querySelector(".closeIcon");
const form = document.getElementById("modalForm");

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

// submit button handler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Create an array to be displayed on the console.
    let formData = [];
    const inputs = document.querySelectorAll("input");
    const message = document.getElementById("message");
    inputs.forEach((input) => {
      formData.push(input.value);
    });
    formData.push(message.value);
    console.log("Form submitted!");
    console.log(formData);
    closeModal();
  });


//___________________________________________________________//
//                        FUNCTIONS                          //
//___________________________________________________________//

function displayModal(name) {
    const modalEl = document.getElementById("contact_modal");
    const modalTitle = modalEl.querySelector("h2");

    modalTitle.innerHTML = ""; //reset the HTML in case we open the modal again
    modalTitle.innerHTML = `<div class="header_wrapper">
                            <h2 class="header_h2">Contactez-moi</h2>
                            <h2 class="header_h2">${name}</h2>
                            </div>
                            `;
                            
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