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
            descricao: {
                required: 'Descrição é obrigatória',
                maxlength: 'Máximo de 50 caracteres'
            },
            codigoBarras: {
                maxlength: 'Máximo de 50 caracteres'
            },
            situacao: {
                required: 'Situação é obrigatória'
            },
            formaPagamento: {
                maxlength: 'Máximo de 30 caracteres'
            },
            valorPagar: {
                required: 'Valor é obrigatório'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.contasPagarForm);
    }
}