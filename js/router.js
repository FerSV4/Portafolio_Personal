function inicializarEnrutador() {
    const Container_principal = document.getElementById('main-content');
    //Las rutas definidas para este proyecto(Portafolio)
    const rutas = {
        '': { html: 'site/secciones/inicio.html'},
        '/': { html: 'site/secciones/inicio.html' },
        'inicio': { html: 'site/secciones/inicio.html' },
        'proyectos': {
            html: 'site/secciones/proyectos.html',
            callback: () => {
                if (typeof renderProjectCards === 'function') {
                    renderProjectCards();
                }
            }
        },
        'sobremi': { html: 'site/secciones/sobremi.html'},
        'articulos': { html: 'site/secciones/articulos.html'},
        'contacto': { html: 'site/secciones/contacto.html' }
    };
//funcion de carga de contenido segun la ruta (seccion)
    function Carga_contenido() {

        let Ver_hash_en_uso = window.location.hash;
        let Ver_nombre_ruta = '';
        if (Ver_hash_en_uso.startsWith('#/')) {
            Ver_nombre_ruta = Ver_hash_en_uso.substring(2); 
        } else if (Ver_hash_en_uso.startsWith('#')) {
            Ver_nombre_ruta = Ver_hash_en_uso.substring(1); 
        } else {
            Ver_nombre_ruta = '/';
        }
        
        if (Ver_nombre_ruta === '') {
            Ver_nombre_ruta = '/';
        }

        const rutaConfig = rutas[Ver_nombre_ruta] || rutas['/'] || rutas[''];
        if (rutaConfig && typeof loadHTML === 'function') {
            loadHTML('#main-content', rutaConfig.html, rutaConfig.callback);
        }
    }
    window.addEventListener('hashchange', Carga_contenido);

    document.addEventListener('DOMContentLoaded', () => {
        Carga_contenido(); 
    });
}