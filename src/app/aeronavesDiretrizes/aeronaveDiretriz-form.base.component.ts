import { Aeronave, AeronaveDiretriz } from './models/AeronaveDiretriz';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AeronaveDiretrizBaseComponent extends FormBaseComponent {
    
    aeronaveDiretriz: AeronaveDiretriz;
    aeronaves: Aeronave[];
    errors: any[] = [];
    aeronaveDiretrizForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            aeronaveId: {
                required: 'Escolha uma aeronave',
            },
            titulo: {
                required: 'Título é obrigatório',
                maxlength: 'Máximo de 100 caracteres'
            },
            referencia: {
                required: 'Referência é obrigatória',
                maxlength: 'Máximo de 100 caracteres'
            },
            dataEfetivacao: {
                required: 'Data de Efetivação é obrigatória'
            },
            descricao: {
                maxlength: 'Máximo de 500 caracteres'
            },
            tipoDiretriz: {
                required: 'Tipo da Diretriz é obrigatória'
            },
            observacoes: {
                maxlength: 'Máximo de 500 caracteres'
            },
            status: {
                required: 'Status é obrigatório'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveDiretrizForm);
    }
}