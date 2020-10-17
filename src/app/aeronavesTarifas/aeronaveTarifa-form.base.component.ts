import { Aeronave, AeronaveTarifa } from '../aeronavesTarifas/models/AeronaveTarifa';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AeronaveTarifaBaseComponent extends FormBaseComponent {

    aeronaveTarifa: AeronaveTarifa;
    aeronaves: Aeronave[];
    errors: any[] = [];
    aeronaveTarifaForm: FormGroup;

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
            vencimento: {
                required: 'Vencimento é obrigatório'
            },
            valor: {
                required: 'Valor é obrigatório'
            },
            orgaoEmissor: {
                required: 'Órgão Emissor é obrigatório'
            },
            numeracao: {
                required: 'Numeração é obrigatória'
            },
            situacao: {
                required: 'Situação é obrigatória'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveTarifaForm);
    }
}