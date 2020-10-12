import { Cliente } from './models/Cliente';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ClienteBaseComponent extends FormBaseComponent {

    cliente: Cliente;
    clientes: Cliente[];
    errors: any[] = [];
    clienteForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            primeiroNome: {
                required: 'Primeiro Nome é obrigatório',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            ultimoNome: {
                required: 'Último Nome é obrigatório',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            email: {
                email: 'Formato de e-mail inválido'
            },
            cpf: {
                required: 'CPF é obrigatório',
                cpf: 'CPF em formato inválido'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.clienteForm);
    }
}