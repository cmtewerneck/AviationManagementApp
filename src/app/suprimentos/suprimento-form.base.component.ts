import { Suprimento } from './models/suprimento';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class SuprimentoBaseComponent extends FormBaseComponent {
    
    suprimento: Suprimento;
    suprimentos: Suprimento[];
    errors: any[] = [];
    suprimentoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            codigo: {
                maxlength: 'Máximo de 30 caracteres'
            },
            partNumber: {
                required: 'PartNumber é obrigatório',
                maxlength: 'Máximo de 30 caracteres'
            },
            nomenclatura: {
                required: 'Nome é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            },
            quantidade: {
                required: 'Quantidade é obrigatória'
            },
            localizacao: {
                maxlength: 'Máximo de 30 caracteres'
            },
            partNumberAlternativo: {
                maxlength: 'Máximo de 30 caracteres'
            },
            aplicacao: {
                maxlength: 'Máximo de 20 caracteres'
            },
            capitulo: {
                maxlength: 'Máximo de 20 caracteres'
            },
            serialNumber: {
                maxlength: 'Máximo de 30 caracteres'
            },
            doc: {
                maxlength: 'Máximo de 20 caracteres'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.suprimentoForm);
    }
}