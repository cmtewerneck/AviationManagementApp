import { Curso, Turma } from './models/Turma';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class TurmaBaseComponent extends FormBaseComponent {
    
    turma: Turma;
    cursos: Curso[];
    errors: any[] = [];
    turmaForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            codigo: {
                required: 'O código é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            dataInicio: {
                required: 'A data Inicial é obrigatória'
            },
            cursoId: {
                required: 'O curso é obrigatório'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.turmaForm);
    }
}