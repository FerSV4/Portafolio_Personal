function renderProjectCards() {
    const contenedor = document.querySelector('.proyectos__contenedor'); 
    if (!contenedor) {
        return;
    }
    contenedor.innerHTML = ''; 
    proyectosData.forEach(proyecto => { 
        const tarjeta = document.createElement('tarjeta-proyecto');
        tarjeta.setAttribute('datos-proyecto-id', proyecto.titulo);
        contenedor.appendChild(tarjeta);
    });
}

const SavedProjectsViewObserver = {
    update: function() {
        this.render();
    },

    render: function() {
        const contenedorGuardados = document.querySelector('.guardados__contenedor');
        
        if (window.location.hash !== '#/guardados' || !document.body.contains(contenedorGuardados)) {
            return; 
        }
        
        if (!contenedorGuardados) {
            return;
        }
        contenedorGuardados.innerHTML = '';

        const spManager = SavedProjectsManager.getInstance();
        const itemsToDisplay = spManager.getDisplayableItems();
        const totalSaved = spManager.getTotalSavedCountDirect();
        const filterTerm = spManager.getCurrentFilterTerm();

        if (totalSaved === 0) {
            contenedorGuardados.innerHTML = '<p style="text-align:center; font-size: 1.2rem; color: var(--text-color); padding: 2rem;">No tienes proyectos guardados :(</p>';
            return;
        }
        
        itemsToDisplay.forEach(item => {
            const tarjeta = document.createElement('tarjeta-proyecto');
            tarjeta.setAttribute('datos-proyecto-id', item.titulo);
            contenedorGuardados.appendChild(tarjeta);
        });
    },

    initializeView: function() {
        const spManager = SavedProjectsManager.getInstance();
        spManager.subscribe(this);
        spManager.refreshInitialDisplayableItems(proyectosData);
    }
};

function setupGuardadosPageView() {
    SavedProjectsViewObserver.initializeView();
}