import { Estoque } from './models/estoque';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class EstoqueBaseComponent extends FormBaseComponent {

    estoque: Estoque;
    estoques: Estoque[];
    errors: any[] = [];
    estoqueForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            nomenclatura: {
                required: 'Nome é obrigatório'
            },
            quantidade: {
                required: 'Quantidade é obrigatória'
            },
            imagem: {
                required: 'Informe a Imagem'
            },
            partNumber: {
                required: 'PartNumber é obrigatório'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.estoqueForm);
    }
}