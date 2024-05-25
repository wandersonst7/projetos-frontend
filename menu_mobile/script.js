const btnMobile = document.querySelector('#btn-mobile');
const navItems = document.querySelector("#nav-items");

btnMobile.addEventListener('click', toggleMobile)

function toggleMobile(){
    navItems.classList.toggle('active');
    btnMobile.classList.toggle('activeButtonMobile')
}