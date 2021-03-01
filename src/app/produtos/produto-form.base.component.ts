import { Produto, Fornecedor } from './models/produto';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ProdutoBaseComponent extends FormBaseComponent {
    
    produto: Produto;
    fornecedores: Fornecedor[];
    errors: any[] = [];
    produtoForm: FormGroup;
    
    MASKS = utilsBr.MASKS;
    
    constructor() {
        super();
        
        this.validationMessages = {
            fornecedorId: {
                required: 'Escolha um fornecedor'
            },
            nome: {
                required: 'Nome é obrigatório',
                maxlength: 'Máximo de 100 caracteres'
            },
            descricao: {
                required: 'Descrição é obrigatória',
                maxlength: 'Máximo de 500 caracteres'
            },
            valor: {
                required: 'Informe o Valor'
            },
            imagem: {
                required: 'Informe a Imagem'
            }
        }
        
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
    
    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.produtoForm);
    }
}