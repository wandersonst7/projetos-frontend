const tasks = document.querySelector("#tasks")
const formTask = document.querySelector("#form-task")
const arrayTasks = []

let updateTaskListener = null;
let edit = false;

formTask.addEventListener('submit', saveTask)

function createTask(name){
    const task = document.createElement("div");

    const nameTask = document.createElement("p");
    nameTask.textContent = name;

    const taskActions = document.createElement("div");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button")
    btnEdit.id = "btn-edit"
    btnEdit.textContent = "Editar"
    btnDelete.id = "btn-delete"
    btnDelete.textContent = "Excluir"

    taskActions.classList.add("task-actions");
    taskActions.appendChild(btnEdit)
    taskActions.appendChild(btnDelete)

    task.classList.add('task-item')
    task.appendChild(nameTask)
    task.appendChild(taskActions)
    
    tasks.appendChild(task)

    // Vinculando ações
    btnDelete.addEventListener("click", () => {
        deleteTask(task)
    })

    btnEdit.addEventListener("click", () => {
        editTask(nameTask)
    })

    arrayTasks.push(nameTask.textContent)
}

function saveTask(event){
    event.preventDefault();

    const input = document.querySelector('#name');

    if(validation(input.value)){
        createTask(input.value)
        input.value = ""
    }
}

function editTask(element){
    const input = document.querySelector('#name');
    const button = document.querySelector("#button-submit");
    const task_item = element.parentNode;
    task_item.classList.add('active')

    input.value = element.textContent;
    input.focus();

    button.value = "Atualizar"
    edit = true;

    updateTaskListener = (event) => {
        updateTask(event, element)
    }

    formTask.removeEventListener('submit', saveTask)
    formTask.addEventListener('submit', updateTaskListener)

}

function updateTask(event, element){
    event.preventDefault();

    const input = document.querySelector('#name');
    const button = document.querySelector("#button-submit");
    const task_item = element.parentNode;

    if(validation(input.value)){
        element.textContent = input.value
        button.value = "Cadastrar"
        input.value = ""

        // Alterando listener
        formTask.removeEventListener('submit', updateTaskListener)
        formTask.addEventListener('submit', saveTask)
        task_item.classList.remove('active')
        edit = false;
    }
}

function deleteTask (element){
    let index = arrayTasks.indexOf(element.children[0].textContent);
    arrayTasks.splice(index, 1)
    tasks.removeChild(element)

    if(edit){
        const input = document.querySelector('#name');
        const button = document.querySelector("#button-submit");
        const taskActive = document.querySelector('.active');

        if(taskActive){
            taskActive.classList.remove('active');
        }

        button.value = "Cadastrar"
        input.value = ""
        // Alterando listener
        formTask.removeEventListener('submit', updateTaskListener)
        formTask.addEventListener('submit', saveTask)
    }

}

function validation(value){
    const validationElement = document.querySelector("#validation");

    if(value.trim() === ""){
        validationElement.innerText = "Este campo é obrigatório"
        return false
    }else if(arrayTasks.indexOf(value.trim()) !== -1){
        validationElement.innerText = "Já existe uma tarefa com este nome!"
        return false
    }else{
        validationElement.innerText = ""
        return true
    }

}