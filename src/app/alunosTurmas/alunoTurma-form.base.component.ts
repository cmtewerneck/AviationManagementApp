import { Aluno, Turma, AlunoTurma } from './models/AlunoTurma';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AlunoTurmaBaseComponent extends FormBaseComponent {
    
    alunoTurma: AlunoTurma;
    alunos: Aluno[];
    turmas: Turma[];
    errors: any[] = [];
    alunoTurmaForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            alunoId: {
                required: 'O aluno é obrigatório'
            },
            turmaId: {
                required: 'A turma é obrigatória'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.alunoTurmaForm);
    }
}