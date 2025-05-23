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
        console.log(`Se realizo un like "${this.receptor.titulo}". Cantidad de likes actual: ${this.receptor.likes}`);
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
    constructor(proyecto, EL_boton) {
        super(proyecto);
        this.EL_boton = EL_boton;
        this.icono = EL_boton.querySelector('i');
        this.Prj_guardado = proyecto.guardado; 
        this.Verif_si_activo = EL_boton.classList.contains('active');
    }

    ejecutar() {
        this.EL_boton.classList.toggle('active');
        const Actual_activo = this.EL_boton.classList.contains('active');
        this.receptor.guardado = Actual_activo;

        if (this.icono) {
            if (Actual_activo) {
                this.icono.classList.remove('far');
                this.icono.classList.add('fas');
            } else {
                this.icono.classList.remove('fas');
                this.icono.classList.add('far');
            }
        }
        console.log(`Se realizo un save "${this.receptor.titulo}". Estado actual: ${this.receptor.guardado}`);
    }

    deshacer() {
        this.receptor.guardado = this.Prj_guardado;
        if (this.icono) {
            if (this.receptor.guardado) {
                this.EL_boton.classList.add('active');
                this.icono.classList.remove('far');
                this.icono.classList.add('fas');
            } else {
                this.EL_boton.classList.remove('active');
                this.icono.classList.remove('fas');
                this.icono.classList.add('far');
            }
        }
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
 * @param {HTMLButtonElement} buttonElement 
 * @param {object} project 
 */
function Ejecutar_save(buttonElement, project) {
    buttonElement.addEventListener('click', () => {
        const comando = new SaveCommand(project, buttonElement);
        comando.ejecutar();

    });
}

