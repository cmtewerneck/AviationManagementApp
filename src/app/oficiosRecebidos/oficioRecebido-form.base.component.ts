import { OficioRecebido } from './models/OficioRecebido';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class OficioRecebidoBaseComponent extends FormBaseComponent {
    
    oficioRecebido: OficioRecebido;
    oficiosRecebidos: OficioRecebido[];
    errors: any[] = [];
    oficioRecebidoForm: FormGroup;
    
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
            assunto: {
                required: 'O assunto é obrigatório',
                maxlength: 'O assunto deve ter no máximo 50 caracteres'
            },
            remetente: {
                required: 'O remetente é obrigatório',
                maxlength: 'O remetente deve ter no máximo 20 caracteres'
            }
        }
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.oficioRecebidoForm);
    }
}