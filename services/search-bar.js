const searchBarTemplate = document.createElement('template');
searchBarTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            margin-bottom: 1.5rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        .search-container {
            display: flex;
            align-items: center;
            padding: 0.5rem 0.8rem;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 25px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .search-container i {
            color: #aaa;
            margin-right: 0.5rem;
        }
        input[type="text"] {
            flex-grow: 1;
            border: none;
            padding: 0.6rem 0.2rem;
            font-size: 1rem;
            outline: none;
            background-color: transparent;
        }
    </style>
    <div class="search-container">
        <i class="fas fa-search"></i>
        <input type="text" id="searchInput" placeholder="Buscar en guardados">
    </div>
`;

class SearchBarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._boundHandleInput = this._handleInput.bind(this);
        this._boundHandleKeydown = this._handleKeydown.bind(this);
    }

    connectedCallback() {

        this.shadowRoot.appendChild(searchBarTemplate.content.cloneNode(true));

        this.searchInput = this.shadowRoot.getElementById('searchInput');
        
        this.searchInput.addEventListener('input', this._boundHandleInput);
        this.searchInput.addEventListener('keydown', this._boundHandleKeydown);
    }

    disconnectedCallback() {
        if (this.searchInput) {
            this.searchInput.removeEventListener('input', this._boundHandleInput);
            this.searchInput.removeEventListener('keydown', this._boundHandleKeydown);
        }
    }

    _handleInput(event) {
        const searchTerm = event.target.value;
        this._executeSearch(searchTerm);
    }

    _handleKeydown(event) {
        if (event.key === 'Enter') {
            const searchTerm = event.target.value;
            this._executeSearch(searchTerm);
        }
    }

    _executeSearch(term) {
        if (typeof SearchCommand !== 'undefined') {
            const command = new SearchCommand(term);
            command.ejecutar();
        } 
    }
}

customElements.define('search-bar', SearchBarComponent);