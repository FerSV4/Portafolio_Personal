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
                if (navbar.classList.contains('active')) {
                    menuIcon.classList.remove('fa-times');
                    navbar.classList.remove('active');
                }
            };
        });

    }
}