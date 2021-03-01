import { SuprimentoMovimentacao, Suprimento } from './models/suprimentoMovimentacao';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class SuprimentoMovimentacaoBaseComponent extends FormBaseComponent {
    
    suprimentoMovimentacao: SuprimentoMovimentacao;
    suprimentosMovimentacao: SuprimentoMovimentacao[];
    suprimentos: Suprimento[];
    errors: any[] = [];
    suprimentoMovimentacaoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            data: {
                required: 'Data é obrigatória'
            },
            quantidade: {
                required: 'Quantidade é obrigatória'
            },
            tipoMovimentacao: {
                required: 'Tipo é obrigatório'
            }            
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.suprimentoMovimentacaoForm);
    }
}