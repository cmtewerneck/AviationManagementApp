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
                required: 'Quantidade é obrigatória',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 2 caracteres'
            },
            imagem: {
                required: 'Informe a Imagem'
            },
            modelo: {
                required: 'PartNumber é obrigatório',
                minlength: 'Mínimo de 1 caracter',
                maxlength: 'Máximo de 30 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.veiculoForm);
    }
}