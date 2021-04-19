import { Aeronave, AeronaveDocumento } from '../aeronavesDocumentos/models/AeronaveDocumento';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class AeronaveDocumentoBaseComponent extends FormBaseComponent {
    
    aeronaveDocumento: AeronaveDocumento;
    aeronaves: Aeronave[];
    errors: any[] = [];
    aeronaveDocumentoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            aeronaveId: {
                required: 'Escolha uma aeronave',
            },
            titulo: {
                required: 'Título é obrigatório',
                maxlength: 'Máximo de 50 caracteres'
            },
            dataValidade: {
                required: 'Validade é obrigatória'
            }
        };
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.aeronaveDocumentoForm);
    }
}