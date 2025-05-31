
function renderProjectCards() {
    const contenedor = document.querySelector('.proyectos__contenedor'); 
    contenedor.innerHTML = ''; 

    proyectosData.forEach(proyecto => { //
        const tarjeta = document.createElement('tarjeta-proyecto'); //
        tarjeta.setAttribute('datos-proyecto-id', proyecto.titulo);
        contenedor.appendChild(tarjeta);
    });
}

// OBSERVER
const SavedProjectsViewObserver = {

    update: function() {
        this.render();
    },


    render: function() {

        const contenedorGuardados = document.querySelector('.guardados__contenedor');
        if (window.location.hash !== '#/guardados' || !document.body.contains(contenedorGuardados)) {

            return;
        }
        contenedorGuardados.innerHTML = ''; 

        const spManager = SavedProjectsManager.getInstance(); 
        const savedProjects = spManager.getSavedProjects(proyectosData); 

        if (savedProjects.length === 0) {
            contenedorGuardados.innerHTML = '<p style="text-align:center; font-size: 1.2rem; color: var(--text-color); padding: 2rem;">No tienes proyectos guardados actualmente.</p>';
            return;
        }

        savedProjects.forEach(proyecto => {
            const tarjeta = document.createElement('tarjeta-proyecto'); //
            tarjeta.setAttribute('datos-proyecto-id', proyecto.titulo);
            contenedorGuardados.appendChild(tarjeta);
        });
    },

    initialize: function() {
        SavedProjectsManager.getInstance().subscribe(this); //
        this.render(); 
    },

    destroy: function() {
        SavedProjectsManager.getInstance().unsubscribe(this); //
    }
};

function setupGuardadosPageView() {
    SavedProjectsViewObserver.initialize();
}