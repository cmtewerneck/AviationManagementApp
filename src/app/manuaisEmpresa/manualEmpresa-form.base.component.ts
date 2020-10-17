import { ManualEmpresa } from './models/ManualEmpresa';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ManualEmpresaBaseComponent extends FormBaseComponent {

    manualEmpresa: ManualEmpresa;
    errors: any[] = [];
    manualEmpresaForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            descricao: {
                required: 'Descrição é obrigatória',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 100 caracteres'
            },
            sigla: {
                required: 'Sigla é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 20 caracteres'
            },
            revisaoAtual: {
                required: 'Revisão Atual é obrigatório',
            },
            dataRevisao: {
                required: 'Data da Revisão é obrigatória',
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.manualEmpresaForm);
    }
}