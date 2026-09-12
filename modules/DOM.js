const loadHTML = (selector, url, callback) => {
    fetch(url)
        .then(response => {
            return response.text();
        })
        .then(data => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = data;
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        })
};