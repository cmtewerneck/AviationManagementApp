import { Veiculo, VeiculoGasto } from './models/VeiculoGasto';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VeiculoGastoBaseComponent extends FormBaseComponent {

    veiculoGasto: VeiculoGasto;
    veiculos: Veiculo[];
    errors: any[] = [];
    veiculoGastoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            veiculoId: {
                required: 'Escolha um veículo',
            },
            valor: {
                required: 'Valor é obrigatório'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            motorista: {
                required: 'Motorista é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            data: {
                required: 'Data é obrigatória'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.veiculoGastoForm);
    }
}