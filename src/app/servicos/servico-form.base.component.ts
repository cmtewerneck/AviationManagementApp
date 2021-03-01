import { Servico } from './models/Servico';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ServicoBaseComponent extends FormBaseComponent {
    
    servico: Servico;
    servicos: Servico[];
    errors: any[] = [];
    servicoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            codigo: {
                required: 'Código é obrigatório',
                maxlength: 'O código deve ter no máximo 30 caracteres'
            },
            titulo: {
                required: 'Título é obrigatória',
                maxlength: 'O título deve ter no máximo 30 caracteres'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.servicoForm);
    }
}