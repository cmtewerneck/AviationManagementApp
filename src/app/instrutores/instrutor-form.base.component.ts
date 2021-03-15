import { Instrutor } from './models/Instrutor';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class InstrutorBaseComponent extends FormBaseComponent {
  
  instrutor: Instrutor;
  instrutores: Instrutor[];
  errors: any[] = [];
  instrutorForm: FormGroup;
  
  MASKS = utilsBr.MASKS;
  
  constructor() {
    super();
    
    this.validationMessages = {
      nome: {
        required: 'Nome é obrigatório',
        maxlength: 'Máximo de 100 caracteres'
      },
      documento: {
        required: 'Documento é obrigatório',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      estadoCivil: {
        maxlength: 'Máximo de 20 caracteres'
      },
      telefone: {
        maxlength: 'Máximo de 20 caracteres'
      },
      email: {
        email: 'Formato de e-mail inválido',
        maxlength: 'Máximo de 50 caracteres'
      },
      dataAdmissao: {
        required: 'Data de Admissão é obrigatória'
      },
      cargo: {
        maxlength: 'Máximo de 30 caracteres'
      },
      canac: {
        minlength: 'Mínimo de 6 caracteres',
        maxlength: 'Máximo de 6 caracteres'
      },
      tipoVinculo: {
        required: 'Tipo do Vínculo é obrigatório'
      },
      rg: {
        required: 'RG é obrigatório',
        maxlength: 'Máximo de 20 caracteres'
      },
      orgaoEmissor: {
        maxlength: 'Máximo de 20 caracteres'
      },
      tituloEleitor: {
        maxlength: 'Máximo de 30 caracteres'
      },
      numeroPis: {
        maxlength: 'Máximo de 30 caracteres'
      },
      numeroCtps: {
        maxlength: 'Máximo de 30 caracteres'
      },
      numeroCnh: {
        maxlength: 'Máximo de 30 caracteres'
      }
    };
    
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }
  
  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.instrutorForm);
  }
}