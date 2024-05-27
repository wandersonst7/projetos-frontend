const columns = document.querySelectorAll('.column');
const dropDelete = document.querySelector('#dropDelete');

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
  e.target.classList.add("active");
  dropDelete.classList.add('visibleDelete');
  e.dataTransfer.setData("text/plain", e.target.id);
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  e.target.classList.remove("active");
  dropDelete.classList.remove('visibleDelete');
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(item, e.clientY)

    if(applyAfter){
      applyAfter.insertAdjacentElement("afterend", dragging)
    }else{
      if(!e.target.classList.contains('description')){
        item.prepend(dragging)
      }
    }

  })
})

function getNewPosition(column, posY){
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for(let refer_card of cards){
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if(posY >= boxCenterY){
      result = refer_card;
    }
  }

  return result;
}

function allowDrop(e) {
  e.preventDefault();
}

function deleteCard(e) {
  e.preventDefault();
  let id = e.dataTransfer.getData("text/plain");
  let card = document.querySelector(`#${id}`) 
  card.parentNode.removeChild(card);
  dropDelete.classList.remove('visibleDelete');
}