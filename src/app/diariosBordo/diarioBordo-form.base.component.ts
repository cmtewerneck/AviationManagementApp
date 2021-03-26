import { Aeronave, DiarioBordo, Tripulante } from './models/DiarioBordo';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class DiarioBordoBaseComponent extends FormBaseComponent {

    diarioBordo: DiarioBordo;
    aeronaves: Aeronave[];
    tripulantes: Tripulante[];
    mecanicos: Tripulante[];
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
                maxlength: 'Máximo de 20 caracteres'
            },
            de: {
                required: 'Origem é obrigatória',
                maxlength: 'Máximo de 4 caracteres'
            },
            para: {
                required: 'Destino é obrigatório',
                maxlength: 'Máximo de 4 caracteres'
            },
            horaAcionamento: {
                required: 'Horário de Acionamento é obrigatório'
            },
            horaCorte: {
                required: 'Horário de Corte é obrigatório'
            },
            totalDecimal: {
                required: 'Total Decimal é obrigatório'
            },
            totalAcionamentoCorte: {
                required: 'Total do Acionamento ao Corte é obrigatório'
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
            naturezaVoo: {
                required: 'Natureza é obrigatória'
            },
            preVooResponsavel: {
                required: 'Responsável pelo pré voo é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },
            posVooResponsavel: {
                required: 'Responsável pelo pós voo é obrigatório',
                maxlength: 'Máximo de 20 caracteres'
            },            
            observacoes: {
                maxlength: 'Máximo de 300 caracteres'
            },
            discrepancias: {
                maxlength: 'Máximo de 300 caracteres'
            },
            acoesCorretivas: {
                maxlength: 'Máximo de 300 caracteres'
            },
            aeronaveId: {
                required: 'Escolha uma aeronave'
            },
            comandanteId: {
                required: 'Escolha um comandante'
            },
            mecanicoResponsavelId: {
                required: 'Escolha um mecânico'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.diarioBordoForm);
    }
}