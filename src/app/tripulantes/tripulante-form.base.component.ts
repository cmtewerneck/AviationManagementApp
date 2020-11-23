import { Tripulante } from './models/tripulante';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class TripulanteBaseComponent extends FormBaseComponent {

    tripulante: Tripulante;
    tripulantes: Tripulante[];
    errors: any[] = [];
    tripulanteForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            nome: {
                required: 'O nome é obrigatório',
                minlength: 'Mínimo 2 caracteres',
                maxlength: 'Máximo 200 caracteres'
              },
              canac: {
                required: 'O CANAC é obrigatório',
                minlength: 'Mínimo 6 caracteres',
                maxlength: 'Máximo 6 caracteres'
              },
              cpf: {
                required: 'CPF é obrigatório',
                cpf: 'CPF em formato inválido'
              },
              email: {
                email: 'E-mail em formato inválido'
              },
              cargo: {
                required: 'O cargo é obrigatório'
              },
              imagem: {
                required: 'Informe a Imagem',
              }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.tripulanteForm);
    }
}