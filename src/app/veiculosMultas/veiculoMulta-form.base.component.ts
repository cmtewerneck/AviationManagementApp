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
            data: {
                required: 'Data é obrigatória'
            },
            autoInfracao: {
                required: 'Auto de Infração obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            responsavel: {
                maxlength: 'Máximo de 30 caracteres'
            },
            classificacao: {
                maxlength: 'Máximo de 30 caracteres'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                maxlength: 'Máximo de 50 caracteres'
            },
            situacao: {
                required: 'Situação é obrigatória'
            },
            veiculoId: {
                required: 'Escolha um veículo'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.veiculoMultaForm);
    }
}