import { Instrutor } from './models/Instrutor';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class InstrutorBaseComponent extends FormBaseComponent {

    instrutor: Instrutor;
    instrutores: Instrutor[];
    errors: any[] = [];
    instrutorForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            nome: {
                required: 'O nome é obrigatório',
                minlength: 'Mínimo 2 caracteres',
                maxlength: 'Máximo 200 caracteres'
              },
              canac: {
                required: 'O CANAC é obrigatório',
                minlength: 'Mínimo 6 caracteres',
                maxlength: 'Máximo 6 caracteres'
              },
              cpf: {
                required: 'CPF é obrigatório',
                cpf: 'CPF em formato inválido'
              },
              rg: {
                required: 'RG é obrigatório',
                maxlength: 'Máximo 15 caracteres'
              },
              email: {
                email: 'E-mail em formato inválido'
              },
              telefone: {
                required: 'Telefone é obrigatório'
              }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.instrutorForm);
    }
}