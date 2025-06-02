class SaveButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.project = null; 
        this.buttonElement = null;
        this.iconElement = null;

    }

    static get observedAttributes() {
        return ['project-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'project-id' && oldValue !== newValue) {
            if (newValue) {
                this.project = proyectosData.find(p => p.titulo === newValue);
            } else {
                this.project = null;
            }
            this._render();
        }
    }

    connectedCallback() {

        if (!this.project && this.hasAttribute('project-id')) {
            const projectId = this.getAttribute('project-id');
            this.project = proyectosData.find(p => p.titulo === projectId);
        }
        this._render();
    }

    _render() {
        if (!this.innerHTML.trim()) { 
            this.innerHTML = `
                <button class="proyecto-card__action-button proyecto-card__action-button--save" aria-label="Guardar">
                    <i class="far fa-bookmark"></i>
                </button>
            `;
            this.buttonElement = this.querySelector('button');
            this.iconElement = this.querySelector('i');

            if (this.buttonElement) {
                this.buttonElement.addEventListener('click', this._handleClick.bind(this));
            } 
        }
        this._updateVisualState();
    }

    _updateVisualState() {

        if (this.project.guardado) {
            this.buttonElement.classList.add('active');
            this.iconElement.classList.remove('far');
            this.iconElement.classList.add('fas');
        } else {
            this.buttonElement.classList.remove('active');
            this.iconElement.classList.remove('fas');
            this.iconElement.classList.add('far');
        }
    }

    _handleClick() {
        const comando = new SaveCommand(this.project, this.buttonElement); //
        comando.ejecutar();
        const spManager = SavedProjectsManager.getInstance(); //
        spManager.toggleSaveState(this.project);
        this._updateVisualState();
    }
}
customElements.define('save-button', SaveButtonComponent);