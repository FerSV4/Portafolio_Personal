const loadHTML = (selector, url, callback) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${url}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = data;
                if (callback && typeof callback === 'function') {
                    callback();
                }
            } else {
                console.error(`Elemento con selector "${selector}" no encontrado para cargar ${url}.`);
            }
        })
        .catch(error => console.error(`Error en fetch para ${url}:`, error));
};