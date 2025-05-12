function initializeMenu() {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

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
        if (currentNavbar.classList.contains('active')) {
            currentMenuIcon.classList.remove('fa-times');
            currentNavbar.classList.remove('active');
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const loadHTML = (selector, url, callback) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.querySelector(selector);
                element.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`Error ${url}:`, error));
    };

    loadHTML('#header-placeholder', 'site/header.html', initializeMenu);
    loadHTML('#inicio-placeholder', 'site/secciones/inicio.html');
    loadHTML('#proyectos-placeholder', 'site/secciones/proyectos.html');
    loadHTML('#sobremi-placeholder', 'site/secciones/sobremi.html');
    loadHTML('#articulos-placeholder', 'site/secciones/articulos.html');
    loadHTML('#contacto-placeholder', 'site/secciones/contacto.html');
    loadHTML('#footer-placeholder', 'site/footer.html');
});