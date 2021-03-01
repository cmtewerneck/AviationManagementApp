import { Aluno } from './models/Aluno';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AlunoBaseComponent extends FormBaseComponent {
    
    aluno: Aluno;
    alunos: Aluno[];
    errors: any[] = [];
    alunoForm: FormGroup;
    
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
            },
            rg: {
                required: 'RG é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },
            canac: {
                minlength: 'Mínimo de 6 caracteres',
                maxlength: 'Máximo de 6 caracteres'
            },
            dataNascimento: {
                required: 'Data é obrigatória'
            },
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.alunoForm);
    }
}