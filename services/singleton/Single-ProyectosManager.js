const SavedProjectsManager = (() => {
    let instance;
    const observers = [];
    let ProyectosGuardadosTitle = [];

    let _currentFilterTerm = '';
    let _ActualesProyectosGuardados = [];
    let ElementosMostrables = [];

    function CargarDesdeLocalStorage() {
        const TitulosGuardados = localStorage.getItem('ProyectosGuardadosTitle');
        if (TitulosGuardados) {
            ProyectosGuardadosTitle = JSON.parse(TitulosGuardados);
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('ProyectosGuardadosTitle', JSON.stringify(ProyectosGuardadosTitle));
    }

    function _MostrartodosLosProyectosGuardados(projectDataArrayGlobal) {
        if (!projectDataArrayGlobal) return [];
        return projectDataArrayGlobal.filter(p => ProyectosGuardadosTitle.includes(p.titulo));
    }

    function _aplicarFiltroListaProyectos() {
        if (!_currentFilterTerm) {
            ElementosMostrables = [..._ActualesProyectosGuardados];
        } else {
            ElementosMostrables = _ActualesProyectosGuardados.filter(project =>
                (project.titulo && project.titulo.toLowerCase().includes(_currentFilterTerm))
            );
        }
    }

    function notifyObservers() {
        for (const observer of observers) {
            if (observer && typeof observer.update === 'function') {
                observer.update();
            }
        }
    }

    function createInstance() {
        CargarDesdeLocalStorage();

        return {
            initializeProjectDataStatus: (projectDataArrayGlobal) => {
                if (!projectDataArrayGlobal) return;
                projectDataArrayGlobal.forEach(p => {
                    if (typeof p.guardado === 'undefined') { p.guardado = false; }
                    p.guardado = ProyectosGuardadosTitle.includes(p.titulo);
                });
                _ActualesProyectosGuardados = _MostrartodosLosProyectosGuardados(projectDataArrayGlobal);
                _aplicarFiltroListaProyectos();
            },

            toggleSaveState: (project) => {
                if (!project || !project.titulo) return false;
                const EstaGuardado = project.guardado;
                const currentlyInList = ProyectosGuardadosTitle.includes(project.titulo);

                if (EstaGuardado) {
                    if (!currentlyInList) ProyectosGuardadosTitle.push(project.titulo);
                } else {
                    if (currentlyInList) {
                        const index = ProyectosGuardadosTitle.indexOf(project.titulo);
                        ProyectosGuardadosTitle.splice(index, 1);
                    }
                }
                saveToLocalStorage();
                _ActualesProyectosGuardados = _MostrartodosLosProyectosGuardados(proyectosData);
                _aplicarFiltroListaProyectos();
                notifyObservers();
                return true;
            },
            
            SetTerminoyFiltro: function(TerminoBusqueda, projectDataArrayGlobal) {
                _currentFilterTerm = (TerminoBusqueda || '').toLowerCase().trim();
                if (projectDataArrayGlobal) {
                    _ActualesProyectosGuardados = _MostrartodosLosProyectosGuardados(projectDataArrayGlobal);
                }
                _aplicarFiltroListaProyectos();
                notifyObservers();
            },

            obtenerElementosMostrables: function() {
                return ElementosMostrables;
            },
            
            refrescarelementosMostrableInic: function(projectDataArrayGlobal) {
                this.SetTerminoyFiltro('', projectDataArrayGlobal);
            },

            _ContadorGuardadosDirect: function() { 
                return ProyectosGuardadosTitle.length;
            },
            getCurrentFilterTerm: function() {
                return _currentFilterTerm;
            },

            isSaved: (projectTitle) => ProyectosGuardadosTitle.includes(projectTitle),

            subscribe: (observer) => {
                if (observer && typeof observer.update === 'function' && !observers.includes(observer)) {
                    observers.push(observer);
                }
            },
            unsubscribe: (observer) => {
                const index = observers.indexOf(observer);
                if (index > -1) {
                    observers.splice(index, 1);
                }
            }
        };
    }

    return { getInstance: () => { if (!instance) instance = createInstance(); return instance; } };
})();