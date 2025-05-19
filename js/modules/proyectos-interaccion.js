/**
 * @param {HTMLButtonElement} buttonElement 
 * @param {HTMLSpanElement} countElement 
 * @param {object} project 
 */
function attachLikeBehavior(buttonElement, countElement, project) {
    buttonElement.addEventListener('click', () => {
        buttonElement.classList.toggle('active'); 
        if (buttonElement.classList.contains('active')) {
            project.likes++;
            console.log(`Proyecto "${project.titulo}" likeado. Likes: ${project.likes}`);
        } else {
            project.likes--;
            console.log(`Proyecto "${project.titulo}" unlikeado. Likes: ${project.likes}`);
        }
        countElement.textContent = project.likes;
    });
}

/**
 * @param {HTMLButtonElement} buttonElement 
 * @param {object} project .
 */
function attachSaveBehavior(buttonElement, project) {
    buttonElement.addEventListener('click', () => {
        buttonElement.classList.toggle('active');
        const icon = buttonElement.querySelector('i');

        if (buttonElement.classList.contains('active')) { 
            project.guardado = true;
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
            console.log(`Proyecto "${project.titulo}" guardado.`);
        } else {
            project.guardado = false;
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
            console.log(`Proyecto "${project.titulo}" quitado de guardados.`);
        }
    });
}