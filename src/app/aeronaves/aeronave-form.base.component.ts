import { Aeronave } from './models/Aeronave';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AeronaveBaseComponent extends FormBaseComponent {
    
    aeronave: Aeronave;
    errors: any[] = [];
    aeronaveForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            matricula: {
                required: 'Matrícula é obrigatória',
                minlength: 'Mínimo de 5 caracteres',
                maxlength: 'Máximo de 5 caracteres'
            },
            fabricante: {
                required: 'Fabricante é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            },
            categoria: {
                required: 'Categoria é obrigatória',
                maxlength: 'Máximo de 20 caracteres'
            },
            modelo: {
                required: 'Modelo é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            numeroSerie: {
                maxlength: 'Máximo de 20 caracteres'
            },
            motor: {
                maxlength: 'Máximo de 30 caracteres'
            },
            modeloMotor: {
                maxlength: 'Máximo de 30 caracteres'
            },
            numeroSerieMotore: {
                maxlength: 'Máximo de 30 caracteres'
            },
            situacao: {
                required: 'Situação é obrigatória'
            },
            ativo: {
                required: 'Ativo é obrigatório'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveForm);
    }
}