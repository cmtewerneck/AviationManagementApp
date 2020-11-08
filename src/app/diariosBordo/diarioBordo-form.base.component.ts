import { DiarioBordo } from './models/DiarioBordo';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class DiarioBordoBaseComponent extends FormBaseComponent {

    diarioBordo: DiarioBordo;
    errors: any[] = [];
    diarioBordoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            data: {
                required: 'Data é obrigatória'
            },
            base: {
                required: 'Base é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            comandante: {
                required: 'Comandante é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            comandanteCanac: {
                required: 'CANAC é obrigatório',
                minlength: 'Mínimo de 6 caracteres',
                maxlength: 'Máximo de 6 caracteres'
            },
            copiloto: {
                required: 'Copiloto é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            copilotoCanac: {
                required: 'CANAC é obrigatório',
                minlength: 'Mínimo de 6 caracteres',
                maxlength: 'Máximo de 6 caracteres'
            },
            matricula: {
                required: 'Matrícula é obrigatória',
                minlength: 'Mínimo de 5 caracteres',
                maxlength: 'Máximo de 5 caracteres'
            },
            de: {
                required: 'Origem é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 10 caracteres'
            },
            para: {
                required: 'Destino é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 10 caracteres'
            },
            horaAcionamento: {
                required: 'Horário de Acionamento é obrigatório'
            },
            horaDecolagem: {
                required: 'Horário de Decolagem é obrigatório'
            },
            horaPouso: {
                required: 'Horário de Pouso é obrigatório'
            },
            horaCorte: {
                required: 'Horário de Corte é obrigatório'
            },
            totalDecimal: {
                required: 'Total Decimal é obrigatório'
            },
            pousos: {
                required: 'Número de Pousos é obrigatório'
            },
            pob: {
                required: 'POB é obrigatório'
            },
            combustivelDecolagem: {
                required: 'Combustível de Decolagem é obrigatório'
            },
            cupomAbastecimento: {
                maxlength: 'Máximo de 20 caracteres'
            },
            natureza: {
                required: 'Natureza é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 10 caracteres'
            },
            preVoo: {
                required: 'Pré Voo é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 20 caracteres'
            },
            posVoo: {
                required: 'Pós Voo é obrigatória',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 20 caracteres'
            },
            chefeMissao: {
                required: 'Chefe da Missão é obrigatório',
                minlength: 'Mínimo de 1 caracteres',
                maxlength: 'Máximo de 50 caracteres'
            },
            observacoes: {
                maxlength: 'Máximo de 500 caracteres'
            },
            discrepancias: {
                maxlength: 'Máximo de 500 caracteres'
            },
            acoesCorretivas: {
                maxlength: 'Máximo de 500 caracteres'
            },
            mecanicoResponsavel: {
                maxlength: 'Máximo de 100 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.diarioBordoForm);
    }
}