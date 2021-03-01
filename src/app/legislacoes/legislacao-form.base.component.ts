import { Legislacao } from './models/Legislacao';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class LegislacaoBaseComponent extends FormBaseComponent {
    
    legislacao: Legislacao;
    errors: any[] = [];
    legislacaoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            titulo: {
                required: 'Modelo é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            },
            tipo: {
                required: 'Tipo é obrigatório',
            },
            numero: {
                required: 'Número é obrigatório'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.legislacaoForm);
    }
}