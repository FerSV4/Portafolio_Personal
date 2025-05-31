const plantillaTarjetaProyecto = document.createElement('template');
plantillaTarjetaProyecto.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
.proyecto-card {
    background: var(--bg-color); 
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.1); 
    overflow: hidden; 
    text-align: center;
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%; 
}

.proyecto-card:hover {
    transform: translateY(-5px); 
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.15);
}

.proyecto-card__imagen {
    width: 100%;
    height: 180px; 
    object-fit: cover; 
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.proyecto-card__info {
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
}

.proyecto-card__titulo {
    font-size: 1.4rem;
    color: var(--main-color);
    margin-bottom: 0.8rem;
}

.proyecto-card__descripcion {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem; 
    flex-grow: 1;
}

.proyecto-card__enlace {
    color: var(--main-color);
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border: 1px solid var(--main-color);
    border-radius: 0.3rem;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.proyecto-card__enlace:hover {
    text-decoration: underline;
    background-color: var(--main-color);
    color: var(--bg-color);
}

.proyecto-card__enlace-icono {
    margin-left: 0.3rem;
}

.proyecto-card {
    position: relative;
}

.proyecto-card__actions {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
}


.proyecto-card__action-button { /* Estilo general para botones de acción en la tarjeta */
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--main-color);
    color: var(--main-color);
    padding: 0.4rem 0.6rem;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.proyecto-card__action-button:hover {
    background-color: var(--main-color);
    color: var(--bg-color);
}

.proyecto-card__like-count {
    font-size: 0.8rem;
    font-weight: 600;
}

.proyecto-card__action-button--like.active {
    background-color: #ff6b6b; 
    color: white;
    border-color: #ff6b6b;
}

.proyecto-card__action-button--like.active i {
    color: white;
}


    </style>
    <div class="proyecto-card">
        <div class="proyecto-card__actions">
            <button class="proyecto-card__action-button proyecto-card__action-button--like" aria-label="Me gusta">
                <i class="fas fa-heart"></i>
                <span class="proyecto-card__like-count">0</span>
            </button>
            <save-button></save-button> 
        </div>
        <img class="proyecto-card__imagen" src="" alt="Imagen del Proyecto">
        <div class="proyecto-card__info">
            <div>
                <h4 class="proyecto-card__titulo"></h4>
                <p class="proyecto-card__descripcion"></p>
            </div>
            <a href="#" target="_blank" class="proyecto-card__enlace">
                GitHub <i class="proyecto-card__enlace-icono fas fa-external-link-alt"></i>
            </a>
        </div>
    </div>
`;

class TarjetaProyecto extends HTMLElement {
    constructor() {
        super();
        this.raizSombra = this.attachShadow({ mode: 'open' });
        this.raizSombra.appendChild(plantillaTarjetaProyecto.content.cloneNode(true));

        this.elementoImagen = this.raizSombra.querySelector('.proyecto-card__imagen');
        this.elementoTitulo = this.raizSombra.querySelector('.proyecto-card__titulo');
        this.elementoDescripcion = this.raizSombra.querySelector('.proyecto-card__descripcion');
        this.elementoEnlaceGithub = this.raizSombra.querySelector('.proyecto-card__enlace');
        
        this.botonMeGusta = this.raizSombra.querySelector('.proyecto-card__action-button--like');
        this.contadorMeGusta = this.raizSombra.querySelector('.proyecto-card__like-count');
        this.saveButtonComponent = this.raizSombra.querySelector('save-button');

        this._datosProyecto = null;
    }
    static get observedAttributes() {
        return ['datos-proyecto-id']; 
    }

    attributeChangedCallback(nombreAtributo, valorAntiguo, valorNuevo) {
        if (nombreAtributo === 'datos-proyecto-id' && valorAntiguo !== valorNuevo) {
            this._datosProyecto = proyectosData.find(p => p.titulo === valorNuevo); //
            if (this._datosProyecto) {
                this.renderizar();
                this.configurarEventos(); 
            }
        }
    }

    renderizar() {
        if (!this._datosProyecto) {
            return;
        }

        this.elementoImagen.src = this._datosProyecto.imagenSrc || 'assets/default.png';
        this.elementoImagen.alt = this._datosProyecto.imagenAlt || 'Imagen del Proyecto';
        this.elementoTitulo.textContent = this._datosProyecto.titulo || 'Título del Proyecto';
        this.elementoDescripcion.innerHTML = this._datosProyecto.descripcion || 'Descripción no disponible.';
        this.elementoEnlaceGithub.href = this._datosProyecto.github || '#';
        this.contadorMeGusta.textContent = this._datosProyecto.likes !== undefined ? this._datosProyecto.likes : 0;

        if (this._datosProyecto.liked) { 
            this.botonMeGusta.classList.add('active');
        } else {
            this.botonMeGusta.classList.remove('active');
        }

        if (this.saveButtonComponent) {
            this.saveButtonComponent.setAttribute('project-id', this._datosProyecto.titulo);
        }
    }

    configurarEventos() {
        if (!this._datosProyecto) return;

        this.botonMeGusta.onclick = () => {
            const comando = new LikeCommand(this._datosProyecto, this.botonMeGusta, this.contadorMeGusta); //
            comando.ejecutar(); 
            this._datosProyecto.liked = this.botonMeGusta.classList.contains('active');
        };
    }

    connectedCallback() {
        if (this.hasAttribute('datos-proyecto-id')) {
            const proyectoId = this.getAttribute('datos-proyecto-id');
            this._datosProyecto = proyectosData.find(p => p.titulo === proyectoId); //
            if (this._datosProyecto) {
                this.renderizar(); 
                this.configurarEventos();
            }
        }
    }
}
customElements.define('tarjeta-proyecto', TarjetaProyecto);