import { ManualVoo } from './models/ManualVoo';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ManualVooBaseComponent extends FormBaseComponent {

    manualVoo: ManualVoo;
    errors: any[] = [];
    manualVooForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            modeloAeronave: {
                required: 'Modelo é obrigatório',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.manualVooForm);
    }
}