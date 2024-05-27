const btnOpenModal= document.querySelector('#btnOpenModal');

btnOpenModal.addEventListener('click', toggleModal);

export function toggleModal(){
    const background = document.querySelector("#background");
    background.classList.toggle('show');
}