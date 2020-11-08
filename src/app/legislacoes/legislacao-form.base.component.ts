import { Legislacao } from './models/Legislacao';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class LegislacaoBaseComponent extends FormBaseComponent {

    legislacao: Legislacao;
    errors: any[] = [];
    legislacaoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            titulo: {
                required: 'Modelo é obrigatório',
                minlength: 'Mínimo de 5 caracteres',
                maxlength: 'Máximo de 150 caracteres'
            },
            tipo: {
                required: 'Modelo é obrigatório',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 20 caracteres'
            },
            numero: {
                required: 'Modelo é obrigatório'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.legislacaoForm);
    }
}