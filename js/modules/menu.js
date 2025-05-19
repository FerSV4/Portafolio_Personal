function initializeMenu() {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) { 
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        };

        let navLinks = document.querySelectorAll('.navbar a');
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
            let currentNavbar = document.querySelector('.navbar');
            if (currentMenuIcon && currentNavbar && currentNavbar.classList.contains('active')) {
                currentMenuIcon.classList.remove('fa-times');
                currentNavbar.classList.remove('active');
            }
        };
    } else {
        console.error('Error');
    }
}