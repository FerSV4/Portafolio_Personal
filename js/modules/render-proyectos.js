function renderProjectCards() {
    const contenedor = document.querySelector('.proyectos__contenedor');
    if (!contenedor) {
        console.error('Error del container');
        return;
    }
    contenedor.innerHTML = '';

    if (typeof proyectosData === 'undefined') {
        console.error('Error al obtener los datos de proyecto');
        return;
    }
    if (typeof attachLikeBehavior === 'undefined' || typeof attachSaveBehavior === 'undefined') {
        console.error('Error en la interaccion');
        return;
    }

    proyectosData.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'proyecto-card';

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'proyecto-card__actions';

        const likeButton = document.createElement('button');
        likeButton.className = 'proyecto-card__action-button proyecto-card__action-button--like';
        const likeCountSpan = document.createElement('span');
        likeCountSpan.className = 'proyecto-card__like-count';
        likeCountSpan.textContent = proyecto.likes;
        likeButton.innerHTML = `<i class="fas fa-heart"></i> `;
        likeButton.appendChild(likeCountSpan);

        const saveButton = document.createElement('button');
        saveButton.className = 'proyecto-card__action-button proyecto-card__action-button--save';
        if (proyecto.guardado) {
            saveButton.innerHTML = `<i class="fas fa-bookmark"></i>`;
            saveButton.classList.add('active');
        } else {
            saveButton.innerHTML = `<i class="far fa-bookmark"></i>`;
        }

        attachLikeBehavior(likeButton, likeCountSpan, proyecto);
        attachSaveBehavior(saveButton, proyecto);

        actionsDiv.appendChild(likeButton);
        actionsDiv.appendChild(saveButton);

        const img = document.createElement('img');
        img.src = proyecto.imagenSrc;
        img.alt = proyecto.imagenAlt;
        img.className = 'proyecto-card__imagen';

        const infoDiv = document.createElement('div');
        infoDiv.className = 'proyecto-card__info';

        const title = document.createElement('h4');
        title.className = 'proyecto-card__titulo';
        title.textContent = proyecto.titulo;

        const description = document.createElement('p');
        description.className = 'proyecto-card__descripcion';
        description.innerHTML = proyecto.descripcion;

        const link = document.createElement('a');
        link.href = proyecto.github;
        link.target = '_blank';
        link.className = 'proyecto-card__enlace';
        link.innerHTML = 'GitHub <i class="proyecto-card__enlace-icono fas fa-external-link-alt"></i>';

        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        infoDiv.appendChild(link);

        card.appendChild(actionsDiv);
        card.appendChild(img);
        card.appendChild(infoDiv);

        contenedor.appendChild(card);
    });
}