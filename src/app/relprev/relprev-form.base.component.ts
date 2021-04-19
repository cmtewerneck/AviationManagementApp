import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class RelprevBaseComponent extends FormBaseComponent {

    errors: any[] = [];
    relprevForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            inicioJornada: {
                required: 'Início é obrigatório'
            },
            primeiroAcionamento: {
                required: 'Acionamento é obrigatório'
            },
            ultimoCorte: {
                required: 'Corte é obrigatório'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.relprevForm);
    }
}