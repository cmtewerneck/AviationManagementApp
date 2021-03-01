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
            nome: {
                required: 'Nome é obrigatório',
                maxlength: 'Máximo de 100 caracteres'
            },
            documento: {
                required: 'Documento é obrigatório',
                cpf: 'CPF em formato inválido',
                cnpj: 'CNPJ em formato inválido'
            },
            estadoCivil: {
                maxlength: 'Máximo de 20 caracteres'
            },
            telefone: {
                maxlength: 'Máximo de 20 caracteres'
            },
            email: {
                email: 'Formato de e-mail inválido',
                maxlength: 'Máximo de 50 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.clienteForm);
    }
}