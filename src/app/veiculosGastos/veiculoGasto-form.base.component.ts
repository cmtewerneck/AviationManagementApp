import { Veiculo, VeiculoGasto, Colaborador } from './models/VeiculoGasto';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VeiculoGastoBaseComponent extends FormBaseComponent {
    
    veiculoGasto: VeiculoGasto;
    veiculos: Veiculo[];
    colaboradores: Colaborador[];
    errors: any[] = [];
    veiculoGastoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            data: {
                required: 'Data é obrigatória'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                maxlength: 'Máximo de 50 caracteres'
            },
            situacao: {
                required: 'Situação é obrigatória'
            },
            valor: {
                required: 'Valor é obrigatório'
            },
            veiculoId: {
                required: 'Escolha um veículo'
            },
            motoristaId: {
                required: 'Escolha um motorista'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.veiculoGastoForm);
    }
}