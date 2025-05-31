document.addEventListener('DOMContentLoaded', () => {

    SavedProjectsManager.getInstance().initializeProjectDataStatus(proyectosData); //

    const cargarRecursosEstaticos = () => {
        if (typeof loadHTML === 'function') { //
            loadHTML('#header-placeholder', 'site/header.html', () => { //
                if (typeof initializeMenu === 'function') { //
                    initializeMenu();
                }
            });
            loadHTML('#footer-placeholder', 'site/footer.html'); //
        }
    };

    cargarRecursosEstaticos();

    if (typeof inicializarEnrutador === 'function') { //
        inicializarEnrutador();
    }
});

function initializeMenu() {
    let menuIcon = document.querySelector('#menu-icon'); 
    let navbar = document.querySelector('.header__navbar');  

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-times');
            navbar.classList.toggle('active'); 
        };

        let navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.onclick = () => {
                if (navbar.classList.contains('active') && link.getAttribute('href').startsWith('#')) { 
                    menuIcon.classList.remove('fa-times');
                    navbar.classList.remove('active'); 
                }
            };
        });

        window.onscroll = () => {
            let currentMenuIcon = document.querySelector('#menu-icon');
            let currentNavbar = document.querySelector('.header__navbar');
            if (currentNavbar && currentNavbar.classList.contains('active')) { 
                if (currentMenuIcon) {
                    currentMenuIcon.classList.remove('fa-times');
                }
                currentNavbar.classList.remove('active'); 
            }
        };
    }
}