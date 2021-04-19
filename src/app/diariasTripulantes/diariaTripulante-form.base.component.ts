import { DiariaTripulante, Tripulante } from './models/DiariaTripulante';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class DiariaTripulanteBaseComponent extends FormBaseComponent {

    diariaTripulante: DiariaTripulante;
    tripulantes: Tripulante[];
    errors: any[] = [];
    diariaTripulanteForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            dataInicio: {
                required: 'Data é obrigatória'
            },
            valor: {
                required: 'Valor é obrigatório'
            },
            finalidade: {
                required: 'Finalidade é obrigatória',
                maxlength: 'Máximo de 500 caracteres'
            },
            status: {
                required: 'Status é obrigatório'
            },
            formaPagamento: {
                maxlength: 'Máximo 30 caracteres'
            },
            tripulanteId: {
                required: 'Escolha um tripulante'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.diariaTripulanteForm);
    }
}