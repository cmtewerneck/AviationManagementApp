import { Aeronave, AeronaveMotor } from '../aeronavesMotores/models/AeronaveMotor';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AeronaveMotorBaseComponent extends FormBaseComponent {
    
    aeronaveMotor: AeronaveMotor;
    aeronaves: Aeronave[];
    errors: any[] = [];
    aeronaveMotorForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            aeronaveId: {
                required: 'Escolha uma aeronave',
            },
            fabricante: {
                required: 'Fabricante é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            },
            modelo: {
                required: 'Modelo é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            },
            numeroSerie: {
                required: 'Número de Série é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveMotorForm);
    }
}