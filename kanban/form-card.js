const input = document.querySelector('#nameCard');
const btnCloseModal = document.querySelector("#btnCloseModal");
const form = document.querySelector('#form-card');
let updateCardListener = null;

form.addEventListener('submit', saveCard);

btnCloseModal.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    input.value = "";

    if(items.length > 0){
        items.forEach((item) => {
            item.classList.remove('active')
        })
    }
    
    form.removeEventListener('submit', updateCardListener);
    form.addEventListener('submit', saveCard);
    toggleModal()
});

function saveCard(e){
    e.preventDefault();
    
    if(validation(input.value)){
        createCard(input.value)
        toggleModal();
        input.value = ""
    }
}

function createUniqueId(){
    let date = new Date();
    
    return "item" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
}

function createCard(value){

    const item = document.createElement("div");
    item.classList.add("item");
    item.setAttribute("draggable", "true");
    item.innerText = value;
    item.addEventListener("click", () => {
        editCard(item)
    })
    
    item.id = createUniqueId();

    const todoCards = document.querySelector("#todoCards");
    todoCards.appendChild(item)
    
}

function editCard(item){
    toggleModal();
    const button = document.querySelector("#submit");
    const titleModal = document.querySelector('#titleModal');
    item.classList.add('active')

    titleModal.textContent = "Editar Cartão";

    input.value = item.textContent;
    input.focus();

    button.textContent = "Atualizar"

    updateCardListener = (e) => {
        updateCard(e, item)
    }

    form.removeEventListener('submit', saveCard)
    form.addEventListener('submit', updateCardListener)
}

function updateCard(e, item){
    e.preventDefault();

    const button = document.querySelector("#submit");
    const titleModal = document.querySelector('#titleModal');

    if(validation(input.value)){
        item.textContent = input.value
        button.textContent = "Criar"
        input.value = ""
        titleModal.textContent = "Novo Cartão";
    
        form.removeEventListener('submit', updateCardListener)
        form.addEventListener('submit', saveCard)
        item.classList.remove('active')
        toggleModal();
    }

}

function validation(value){
    const validationElement = document.querySelector("#validation");

    if(value.trim() === ""){
        validationElement.innerText = "Este campo é obrigatório"
        validationElement.style.display = 'block';
        return false
    }else{
        validationElement.innerText = ""
        validationElement.style.display = 'none';
        return true
    }
}

function toggleModal(){
    const background = document.querySelector("#background");
    background.classList.toggle('show');
}