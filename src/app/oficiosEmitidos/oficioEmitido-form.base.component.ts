import { OficioEmitido } from './models/oficioEmitido';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class OficioEmitidoBaseComponent extends FormBaseComponent {
    
    oficioEmitido: OficioEmitido;
    oficiosEmitidos: OficioEmitido[];
    errors: any[] = [];
    oficioEmitidoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            data: {
                required: 'Data é obrigatória',
            },
            numeracao: {
                required: 'Numeração é obrigatória',
                maxlength: 'A numeração deve ter no máximo 20 caracteres'
            },
            mensagem: {
                required: 'Mensagem é obrigatória',
                maxlength: 'A mensagem deve ter no máximo 1000 caracteres'
            },
            responsavel: {
                maxlength: 'O responsável deve ter no máximo 20 caracteres'
            },
            destinatario: {
                required: 'Destinatário é obrigatório',
                maxlength: 'O destinatário deve ter no máximo 20 caracteres'
            },
            assunto: {
                required: 'Assunto é obrigatório',
                maxlength: 'O assunto deve ter no máximo 50 caracteres'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.oficioEmitidoForm);
    }
}