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
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            categoria: {
                required: 'Categoria é obrigatória',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 20 caracteres'
            },
            modelo: {
                required: 'Modelo é obrigatório',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 20 caracteres'
            },
            numeroSerie: {
                required: 'Número de Série é obrigatório',
                minlength: 'Mínimo de 1 caracter',
                maxlength: 'Máximo de 20 caracteres'
            },
            imagem: {
                required: 'Informe a Imagem',
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveForm);
    }
}