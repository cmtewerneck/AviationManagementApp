import { VooAgendado, Aeronave } from './models/VooAgendado';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VooAgendadoBaseComponent extends FormBaseComponent {
    
    vooAgendado: VooAgendado;
    aeronaves: Aeronave[];
    errors: any[] = [];
    vooAgendadoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            title: {
                required: 'O título é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            start: {
                required: 'O início é obrigatório'
            },
            end: {
                required: 'O término é obrigatório'
            },
            allDay: {
                required: 'O campo é obrigatório'
            },
            editable: {
                required: 'O campo é obrigatório'
            },
            durationEditable: {
                required: 'O campo é obrigatório'
            },
            backgroundColor: {
                required: 'A cor de fundo é obrigatória',
                maxlength: 'Máximo de 20 caracteres'
            },
            textColor: {
                required: 'A cor do texto é obrigatória',
                maxlength: 'Máximo de 20 caracteres'
            },
            aeronaveId: {
                required: 'Escolha uma Aeronave',
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.vooAgendadoForm);
    }
}