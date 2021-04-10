import { Aeronave, Rastreador } from '../rastreador/models/Rastreador';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class RastreadorBaseComponent extends FormBaseComponent {
    
    rastreador: Rastreador;
    aeronaves: Aeronave[];
    errors: any[] = [];
    rastreadorForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            aeronaveId: {
                required: 'Escolha uma aeronave',
            },
            codigo: {
                required: 'O Código é obrigatório.',
                maxlength: 'Deve conter no máximo 20 caracteres.'
            },
            modelo: {
                maxlength: 'Deve conter no máximo 50 caracteres.'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.rastreadorForm);
    }
}