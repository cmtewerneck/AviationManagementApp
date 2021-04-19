import { PassagemAerea } from './models/PassagemAerea';
import { Colaborador } from './models/Colaborador';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class PassagemAereaBaseComponent extends FormBaseComponent {

    passagemAerea: PassagemAerea;
    colaboradores: Colaborador[];
    errors: any[] = [];
    passagemAereaForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            dataCompra: {
                required: 'Data da Compra é obrigatória'
            },
            dataVoo: {
                required: 'Data do Voo é obrigatória'
            },
            valor: {
                required: 'Valor é obrigatório'
            },
            empresa: {
                required: 'Empresa é obrigatória',
                maxlength: 'Máximo 100 caracteres'
            },
            origem: {
                required: 'Origem é obrigatória',
                maxlength: 'Máximo 100 caracteres'
            }, 
            destino: {
                required: 'Destino é obrigatório',
                maxlength: 'Máximo 100 caracteres'
            }, 
            formaPagamento: {
                maxlength: 'Máximo 30 caracteres'
            }, 
            assento: {
                required: 'Assento é obrigatório',
                maxlength: 'Máximo 30 caracteres'
            }, 
            localizador: {
                maxlength: 'Máximo 30 caracteres'
            }, 
            colaboradorId: {
                required: 'Colaborador é obrigatório'
            }            
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.passagemAereaForm);
    }
}