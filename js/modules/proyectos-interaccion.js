
class Comando {
    constructor(receptor) {
        this.receptor = receptor; 
    }
}

class LikeCommand extends Comando {
    constructor(proyecto, EL_boton, Index_accion) {
        super(proyecto);
        this.EL_boton = EL_boton;
        this.Index_accion = Index_accion;
        this.Like_anterior = proyecto.likes; 
        this.Verif_si_activo = EL_boton.classList.contains('active');
    }

    ejecutar() {
        this.EL_boton.classList.toggle('active');
        if (this.EL_boton.classList.contains('active')) {
            this.receptor.likes++;
        } else {
            this.receptor.likes--;
        }
        this.Index_accion.textContent = this.receptor.likes;
    }

    deshacer() {
        this.receptor.likes = this.Like_anterior;
        this.Index_accion.textContent = this.receptor.likes;
        if (this.Verif_si_activo) {
            this.EL_boton.classList.add('active');
        } else {
            this.EL_boton.classList.remove('active');
        }
    }
}

class SaveCommand extends Comando {
    constructor(proyecto, EL_boton_contexto) { 
        super(proyecto);

        this.Prj_guardado_anterior = proyecto.guardado; 
    }

    ejecutar() {
        this.receptor.guardado = !this.receptor.guardado;

    }

}

/**
 * @param {HTMLButtonElement} buttonElement 
 * @param {HTMLSpanElement} countElement 
 * @param {object} project 
 */
function Ejecutar_like(buttonElement, countElement, project) {
    buttonElement.addEventListener('click', () => {
        const comando = new LikeCommand(project, buttonElement, countElement);
        comando.ejecutar();
    });
}

/**
 * @param {HTMLElement} buttonComponentInstance 
 * @param {object} project 
 */
