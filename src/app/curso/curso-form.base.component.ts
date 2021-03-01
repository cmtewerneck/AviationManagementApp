import { Curso } from './models/Curso';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class CursoBaseComponent extends FormBaseComponent {

    curso: Curso;
    cursos: Curso[];
    errors: any[] = [];
    cursoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            codigo: {
                required: 'Código é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                maxlength: 'Máximo de 50 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.cursoForm);
    }
}