import { OficioEmitido } from './models/oficioEmitido';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class OficioEmitidoBaseComponent extends FormBaseComponent {

    oficioEmitido: OficioEmitido;
    oficiosEmitidos: OficioEmitido[];
    errors: any[] = [];
    oficioEmitidoForm: FormGroup;

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
            destinatario: {
                required: 'Destinatário é obrigatório',
            },
            mensagem: {
                required: 'Mensagem é obrigatória',
                minlength: 'A mensagem precisa ter no mínimo 5 caracteres',
                maxlength: 'A mensagem deve ter no máximo 1000 caracteres'
            },
            assunto: {
                required: 'Assunto é obrigatório',
                minlength: 'A mensagem precisa ter no mínimo 2 caracteres',
                maxlength: 'A mensagem deve ter no máximo 200 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.oficioEmitidoForm);
    }
}