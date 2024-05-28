const btnOpenModal= document.querySelector('#btnOpenModal');

btnOpenModal.addEventListener('click', toggleModal);

function toggleModal(){
    const background = document.querySelector("#background");
    background.classList.toggle('show');
}