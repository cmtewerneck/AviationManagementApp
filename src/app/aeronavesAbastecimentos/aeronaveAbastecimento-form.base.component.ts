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
            litros: {
                required: 'Quantidade é obrigatória'
            },
            local: {
                required: 'Local é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },
            cupom: {
                required: 'Cupom é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },
            fornecedora: {
                required: 'Fornecedora é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },
            responsavel: {
                required: 'Responsável é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },
            observacoes: {
                maxlength: 'Máximo de 100 caracteres'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveAbastecimentoForm);
    }
}