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
                required: 'O número da ordem é obrigatória',
                maxlength: 'O número da ordem deve ter no máximo 20 caracteres'
            },
            tipo: {
                maxlength: 'O tipo deve ter no máximo 20 caracteres'
            },
            ttsn: {
                maxlength: 'TTSN deve ter no máximo 20 caracteres'
            },
            tcsnPousos: {
                maxlength: 'TCSN Pousos deve ter no máximo 20 caracteres'
            },
            dataAbertura: {
                required: 'A data de abertura é obrigatória',
            },
            ttsnMotor: {
                maxlength: 'TTSN do motor deve ter no máximo 20 caracteres'
            },
            tcsnCiclos: {
                maxlength: 'TTSN Ciclos deve ter no máximo 20 caracteres'
            },
            requisicaoMateriais: {
                maxlength: 'A requisição deve ter no máximo 300 caracteres'
            },
            realizadoPor: {
                maxlength: 'O responsável deve ter no máximo 20 caracteres'
            },
            realizadoPorAnac: {
                minlength: 'O Canac deve ter no mínimo 6 caracteres',
                maxlength: 'O Canac deve ter no máximo 6 caracteres'
            },
            inspecionadoPor: {
                maxlength: 'O inspetor deve ter no máximo 20 caracteres'
            },
            inspecionadoPorAnac: {
                minlength: 'O Canac deve ter no mínimo 6 caracteres',
                maxlength: 'O Canac deve ter no máximo 6 caracteres'
            },
            aeronaveId: {
                required: 'Escolha uma aeronave'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.ordemServicoForm);
    }
}