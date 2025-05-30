function renderProjectCards() {
    const contenedor = document.querySelector('.proyectos__contenedor'); //
    if (!contenedor) {
        console.error("Error en el contenedor");
        return;
    }
    contenedor.innerHTML = ''; 




    proyectosData.forEach(proyecto => { //
        const tarjeta = document.createElement('tarjeta-proyecto');
        tarjeta.setAttribute('datos-proyecto-id', proyecto.titulo);

        contenedor.appendChild(tarjeta);
    });
}

