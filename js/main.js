document.addEventListener('DOMContentLoaded', () => {


    if (typeof loadHTML !== 'function') {
        console.error('No se cargo la funcion loadHTML');
        return;
    }

    loadHTML('#header-placeholder', 'site/header.html', () => {
        if (typeof initializeMenu === 'function') {
            initializeMenu();
        } else {
            console.error('error del menu');
        }
    });

    loadHTML('#inicio-placeholder', 'site/secciones/inicio.html');

    loadHTML('#proyectos-placeholder', 'site/secciones/proyectos.html', () => {
        if (typeof renderProjectCards === 'function') {
            renderProjectCards();
        } else {
            console.error('error del render');
        }
    });

    loadHTML('#sobremi-placeholder', 'site/secciones/sobremi.html');
    loadHTML('#articulos-placeholder', 'site/secciones/articulos.html');
    loadHTML('#contacto-placeholder', 'site/secciones/contacto.html');
    loadHTML('#footer-placeholder', 'site/footer.html');
});