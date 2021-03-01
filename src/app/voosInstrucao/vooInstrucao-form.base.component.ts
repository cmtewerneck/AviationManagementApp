import { Aeronave, VooInstrucao, Instrutor, Aluno } from './models/VooInstrucao';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VooInstrucaoBaseComponent extends FormBaseComponent {
    
    vooInstrucao: VooInstrucao;
    aeronaves: Aeronave[];
    colaboradores: Instrutor[];
    alunos: Aluno[];
    errors: any[] = [];
    vooInstrucaoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            data: {
                required: 'Data é obrigatória'
            },
            tempoVoo: {
                required: 'Tempo de voo é obrigatório'
            },
            avaliacao: {
                required: 'Avaliação é obrigatória'
            },
            observacoes: {
                maxlenght: 'Máximo de 200 caracteres'
            },
            aeronaveId: {
                required: 'Escolha uma aeronave'
            },
            alunoId: {
                required: 'Escolha um aluno'
            },
            instrutorId: {
                required: 'Escolha um instrutor'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.vooInstrucaoForm);
    }
}