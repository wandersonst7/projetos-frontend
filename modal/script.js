const btnOpenModal = document.querySelector('#btnOpenModal');
const btnCloseModal = document.querySelector("#btnCloseModal")
const background = document.querySelector("#backgroundModal")

btnOpenModal.addEventListener('click', toggleModal)
background.addEventListener('click', (e) => {
    if(e.target === background){
        toggleModal()
    }
})

btnCloseModal.addEventListener('click', toggleModal)

function toggleModal(){
    background.classList.toggle('show');
    background.classList.toggle('hide');
}