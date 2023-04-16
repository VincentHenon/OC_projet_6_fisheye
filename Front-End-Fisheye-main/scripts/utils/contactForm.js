//import { photographer } from "../pages/photographer.js";

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const sendBtn = document.getElementById("sendBtn");

// send buton handler
sendBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("formulaire validé!");
    closeModal();
})

function displayData(photographer) {
    const { name } = photographer;
    const modalEl = document.getElementById("contact_modal");
    const modalTitle = modalEl.querySelector("h2");
    modalTitle.innerHTML = `<h2>Contactez-moi</h2><h2>${name}</h2>`;
}
