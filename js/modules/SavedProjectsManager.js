//SINGLETON
const SavedProjectsManager = (() => {
    let instance;
    const observers = [];
    let savedProjectTitles = [];

    function loadFromLocalStorage() {
        const storedTitles = localStorage.getItem('savedProjectTitles');
        if (storedTitles) {
            try {
                savedProjectTitles = JSON.parse(storedTitles);
            } catch (e) {
                savedProjectTitles = [];
            }
        }
    }
//LOCALSTORAGE 
    function saveToLocalStorage() {
        localStorage.setItem('savedProjectTitles', JSON.stringify(savedProjectTitles));
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
                    p.guardado = savedProjectTitles.includes(p.titulo);
                });
            },

            toggleSaveState: (project) => {
                if (!project || !project.titulo) return false;
                const isCurrentlySavedInList = savedProjectTitles.includes(project.titulo);

                if (project.guardado) { 
                    if (!isCurrentlySavedInList) {
                        savedProjectTitles.push(project.titulo);
                    }
                } else { 
                    if (isCurrentlySavedInList) {
                        const index = savedProjectTitles.indexOf(project.titulo);
                        savedProjectTitles.splice(index, 1);
                    }
                }
                saveToLocalStorage();
                notifyObservers();
                return true;
            },

            isSaved: (projectTitle) => {
                return savedProjectTitles.includes(projectTitle);
            },

            getSavedProjects: (allProjectsDataGlobal) => {
                if (!allProjectsDataGlobal) return [];
                return allProjectsDataGlobal.filter(p => savedProjectTitles.includes(p.titulo));
            },

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

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();