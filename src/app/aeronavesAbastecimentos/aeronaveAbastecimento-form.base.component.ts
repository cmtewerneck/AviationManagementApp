import { Aeronave, AeronaveAbastecimento } from '../aeronavesAbastecimentos/models/AeronaveAbastecimento';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AeronaveAbastecimentoBaseComponent extends FormBaseComponent {

    aeronaveAbastecimento: AeronaveAbastecimento;
    aeronaves: Aeronave[];
    errors: any[] = [];
    aeronaveAbastecimentoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            aeronaveId: {
                required: 'Escolha uma aeronave',
            },
            data: {
                required: 'Data é obrigatória'
            },
            local: {
                required: 'Local é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            cupom: {
                required: 'Cupom é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 30 caracteres'
            },
            litros: {
                required: 'Quantidade é obrigatória'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveAbastecimentoForm);
    }
}