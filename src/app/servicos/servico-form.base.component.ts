import { Servico } from './models/Servico';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ServicoBaseComponent extends FormBaseComponent {

    servico: Servico;
    servicos: Servico[];
    errors: any[] = [];
    servicoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            descricao: {
                required: 'Número da Ordem é obrigatória',
                minlength: 'A mensagem precisa ter no mínimo 1 caracteres',
                maxlength: 'A mensagem deve ter no máximo 50 caracteres'
            },
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.servicoForm);
    }
}