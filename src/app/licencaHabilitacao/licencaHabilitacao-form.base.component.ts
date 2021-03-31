import { LicencaHabilitacao, Colaborador } from './models/LicencaHabilitacao';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class LicencaHabilitacaoBaseComponent extends FormBaseComponent {

    licencaHabilitacao: LicencaHabilitacao;
    colaboradores: Colaborador[];
    errors: any[] = [];
    licencaHabilitacaoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            validade: {
                required: 'Validade é obrigatória'
            },
            titulo: {
                required: 'Título é obrigatório',
                maxlength: 'Máximo 20 caracteres'
            },
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.licencaHabilitacaoForm);
    }
}