import { OficioRecebido } from './models/OficioRecebido';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class OficioRecebidoBaseComponent extends FormBaseComponent {

    oficioRecebido: OficioRecebido;
    oficiosRecebidos: OficioRecebido[];
    errors: any[] = [];
    oficioRecebidoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            numeracao: {
                required: 'Numeração é obrigatória',
            },
            data: {
                required: 'Data é obrigatória',
            },
            remetente: {
                required: 'Remetente é obrigatório',
            },
            mensagem: {
                required: 'Mensagem é obrigatória',
                minlength: 'A mensagem precisa ter no mínimo 5 caracteres',
                maxlength: 'A mensagem deve ter no máximo 1000 caracteres'
            },
            situacao: {
                required: 'Situação é obrigatória',
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.oficioRecebidoForm);
    }
}