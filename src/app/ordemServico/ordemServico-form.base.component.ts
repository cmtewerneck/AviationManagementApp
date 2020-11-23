import { Aeronave, OrdemServico } from './models/OrdemServico';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class OrdemServicoBaseComponent extends FormBaseComponent {

    ordemServico: OrdemServico;
    ordensServico: OrdemServico[];
    aeronaves: Aeronave[];
    errors: any[] = [];
    ordemServicoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            numeroOrdem: {
                required: 'Número da Ordem é obrigatória',
                minlength: 'A mensagem precisa ter no mínimo 1 caracteres',
                maxlength: 'A mensagem deve ter no máximo 30 caracteres'
            },
            aeronaveId: {
                required: 'Escolha uma aeronave'
            },
            dataAbertura: {
                required: 'Destinatário é obrigatório',
            },
            descricaoServicosProgramados: {
                required: 'Mensagem é obrigatória',
                minlength: 'A mensagem precisa ter no mínimo 1 caracteres',
                maxlength: 'A mensagem deve ter no máximo 1000 caracteres'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.ordemServicoForm);
    }
}