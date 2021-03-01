import { Veiculo } from './models/veiculo';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VeiculoBaseComponent extends FormBaseComponent {
    
    veiculo: Veiculo;
    veiculos: Veiculo[];
    errors: any[] = [];
    veiculoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            placa: {
                required: 'Placa é obrigatória',
                minlength: 'Mínimo de 7 caracteres',
                maxlength: 'Máximo de 10 caracteres'
            },
            ufPlaca: {
                required: 'UF da placa é obrigatória',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 2 caracteres'
            },
            proprio: {
                required: 'Campo obrigatório'
            },
            modelo: {
                required: 'Modelo é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            renavam: {
                required: 'Renavam é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            tipoCombustivel: {
                required: 'Tipo do combustível é obrigatório'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.veiculoForm);
    }
}