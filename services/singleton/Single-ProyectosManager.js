const SavedProjectsManager = (() => {
    let instance;
    const observers = [];
    let savedProjectTitles = [];

    let _currentFilterTerm = '';
    let _allCurrentlySavedProjectObjects = [];
    let _displayableItems = [];

    function loadFromLocalStorage() {
        const storedTitles = localStorage.getItem('savedProjectTitles');
        if (storedTitles) {
            savedProjectTitles = JSON.parse(storedTitles);
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('savedProjectTitles', JSON.stringify(savedProjectTitles));
    }

    function _fetchAllSavedProjectObjectsFromData(projectDataArrayGlobal) {
        if (!projectDataArrayGlobal) return [];
        return projectDataArrayGlobal.filter(p => savedProjectTitles.includes(p.titulo));
    }

    function _applyFilterToSavedProjectsList() {
        if (!_currentFilterTerm) {
            _displayableItems = [..._allCurrentlySavedProjectObjects];
        } else {
            _displayableItems = _allCurrentlySavedProjectObjects.filter(project =>
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
        loadFromLocalStorage();

        return {
            initializeProjectDataStatus: (projectDataArrayGlobal) => {
                if (!projectDataArrayGlobal) return;
                projectDataArrayGlobal.forEach(p => {
                    if (typeof p.guardado === 'undefined') { p.guardado = false; }
                    p.guardado = savedProjectTitles.includes(p.titulo);
                });
                _allCurrentlySavedProjectObjects = _fetchAllSavedProjectObjectsFromData(projectDataArrayGlobal);
                _applyFilterToSavedProjectsList();
            },

            toggleSaveState: (project) => {
                if (!project || !project.titulo) return false;
                const isNowSaved = project.guardado;
                const currentlyInList = savedProjectTitles.includes(project.titulo);

                if (isNowSaved) {
                    if (!currentlyInList) savedProjectTitles.push(project.titulo);
                } else {
                    if (currentlyInList) {
                        const index = savedProjectTitles.indexOf(project.titulo);
                        savedProjectTitles.splice(index, 1);
                    }
                }
                saveToLocalStorage();
                _allCurrentlySavedProjectObjects = _fetchAllSavedProjectObjectsFromData(proyectosData);
                _applyFilterToSavedProjectsList();
                notifyObservers();
                return true;
            },
            
            setSearchTermAndFilter: function(searchTerm, projectDataArrayGlobal) {
                _currentFilterTerm = (searchTerm || '').toLowerCase().trim();
                if (projectDataArrayGlobal) {
                    _allCurrentlySavedProjectObjects = _fetchAllSavedProjectObjectsFromData(projectDataArrayGlobal);
                }
                _applyFilterToSavedProjectsList();
                notifyObservers();
            },

            getDisplayableItems: function() {
                return _displayableItems;
            },
            
            refreshInitialDisplayableItems: function(projectDataArrayGlobal) {
                this.setSearchTermAndFilter('', projectDataArrayGlobal);
            },

            getTotalSavedCountDirect: function() { 
                return savedProjectTitles.length;
            },
            getCurrentFilterTerm: function() {
                return _currentFilterTerm;
            },

            isSaved: (projectTitle) => savedProjectTitles.includes(projectTitle),

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