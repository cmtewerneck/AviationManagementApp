import { CategoriaVoo } from './models/CategoriaVoo';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class CategoriaVooBaseComponent extends FormBaseComponent {

    categoriaVoo: CategoriaVoo;
    errors: any[] = [];
    categoriaVooForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            codigo: {
                required: 'Código é obrigatório',
                minlength: 'Mínimo 1 caracter',
                maxlength: 'Máximo 50 caracteres'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                minlength: 'Mínimo 1 caracter',
                maxlength: 'Máximo 50 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.categoriaVooForm);
    }
}