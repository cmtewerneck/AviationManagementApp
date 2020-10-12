import { Veiculo, VeiculoMulta } from './models/VeiculoMulta';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VeiculoMultaBaseComponent extends FormBaseComponent {

    veiculoMulta: VeiculoMulta;
    veiculos: Veiculo[];
    errors: any[] = [];
    veiculoMultaForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            veiculoId: {
                required: 'Escolha um veículo',
            },
            autoInfracao: {
                required: 'Auto de Infração obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 30 caracteres'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            data: {
                required: 'Data é obrigatória'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.veiculoMultaForm);
    }
}