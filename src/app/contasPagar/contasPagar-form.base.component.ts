import { ContasPagar } from './models/ContasPagar';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ContasPagarBaseComponent extends FormBaseComponent {

    contasPagar: ContasPagar;
    errors: any[] = [];
    contasPagarForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            dataVencimento: {
                required: 'Data é obrigatória'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 100 caracteres'
            },
            valorPagar: {
                required: 'Valor é obrigatório'
            },
            codigoBarras: {
                maxlength: 'Máximo de 100 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.contasPagarForm);
    }
}