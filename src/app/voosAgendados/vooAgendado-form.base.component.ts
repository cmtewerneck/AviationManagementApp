import { VooAgendado, Aeronave } from './models/VooAgendado';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class VooAgendadoBaseComponent extends FormBaseComponent {

    vooAgendado: VooAgendado;
    aeronaves: Aeronave[];
    errors: any[] = [];
    vooAgendadoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            aeronaveId: {
                required: 'Escolha uma Aeronave',
            },
            descricao: {
                required: 'Informe a Descrição',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            comecaEm: {
                required: 'Informe o Início',
            },
            terminaEm: {
                required: 'Informe o Término',
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.vooAgendadoForm);
    }
}