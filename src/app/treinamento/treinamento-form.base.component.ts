import { Treinamento, Tripulante, CategoriaTreinamento } from './models/Treinamento';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class TreinamentoBaseComponent extends FormBaseComponent {

    treinamento: Treinamento;
    tripulantes: Tripulante[];
    categorias: CategoriaTreinamento[];
    errors: any[] = [];
    treinamentoForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            dataInicio: {
                required: 'Data é obrigatória'
            },
            classificacaoTreintamento: {
                required: 'Classificação do treinamento é obrigatório'
            },
            tipoTreintamento: {
                required: 'Tipo do treinamento é obrigatório'
            },
            tipoClasse: {
                required: 'Tipo do treinamento é obrigatório'
            },
            modeloAeronave: {
                minlength: 'Mínimo de 1 caracter',
                maxlength: 'Máximo de 30 caracteres'
            },
            instrutor: {
                required: 'O Instrutor é obrigatório',
                minlength: 'Mínimo de 1 caracter',
                maxlength: 'Máximo de 100 caracteres'
            },
            numero: {
                required: 'O Número é obrigatório',
                minlength: 'Mínimo de 1 caracter',
                maxlength: 'Máximo de 50 caracteres'
            },
            cargaHoraria: {
                required: 'A Carga Horária é obrigatória'
            },
            tripulanteId: {
                required: 'Escolha um Tripulante'
            },
            categoriaId: {
                required: 'Escolha uma Categoria'
            }
        };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
            super.configurarValidacaoFormularioBase(formInputElements, this.treinamentoForm);
    }
}