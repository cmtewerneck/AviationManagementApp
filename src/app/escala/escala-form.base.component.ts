import { Escala, Tripulante } from './models/Escala';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class EscalaBaseComponent extends FormBaseComponent {

    escala: Escala;
    escalas: Escala[];
    tripulantes: Tripulante[];
    errors: any[] = [];
    escalaForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            data: {
                required: 'Data é obrigatória'
            },
            status: {
                required: 'Status é obrigatório'
            },
            tripulanteId: {
                required: 'Tripulante é obrigatório'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.escalaForm);
    }
}