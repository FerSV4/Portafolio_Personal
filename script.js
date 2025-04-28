// Seleccionar el icono del menú y la barra de navegación
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times'); 
    navbar.classList.toggle('active'); 
};

let navLinks = document.querySelectorAll('.navbar a');


navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('fa-times'); 
        navbar.classList.remove('active'); 
    }
});

window.onscroll = () => {
    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};