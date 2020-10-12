import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from '../models/Fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { CepConsulta } from '../models/Endereço';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  fornecedores: Fornecedor[];
  fornecedor: Fornecedor;
  fornecedorForm: FormGroup;
  errors: any[] = [];
  mudancasNaoSalvas: boolean;

  MASKS = utilsBr.MASKS;

  textoDocumento: string = 'CPF requerido';

  constructor(
    private fornecedorService: FornecedorService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ) {
      super();
      this.validationMessages = {
        nome: {
          required: 'O nome é obrigatório',
          minlength: 'Mínimo 2 caracteres',
          maxlength: 'Máximo 200 caracteres'
        },
        documento: {
          required: 'Documento é obrigatório',
          cpf: 'CPF em formato inválido',
          cnpj: 'CNPJ em formato inválido'
        },
        ativo: {
          required: 'Ativo é obrigatório'
        },
        tipoFornecedor: {
          required: 'Tipo de fornecedor é obrigatório'
        },
        logradouro: {
          required: 'O logradouro é obrigatório',
          minlength: 'Mínimo 2 caracteres',
          maxlength: 'Máximo 200 caracteres'
        },
        numero: {
          required: 'O número é obrigatório',
          minlength: 'Mínimo 1 caracteres',
          maxlength: 'Máximo 50 caracteres'
        },
        bairro: {
          required: 'O bairro é obrigatório',
          minlength: 'Mínimo 2 caracteres',
          maxlength: 'Máximo 100 caracteres'
        },
        cep: {
          required: 'O CEP é obrigatório',
          cep: 'CEP em formato inválido'
        },
        cidade: {
          required: 'A cidade é obrigatória',
          minlength: 'Mínimo 2 caracteres',
          maxlength: 'Máximo 100 caracteres'
        },
        estado: {
          required: 'O estado é obrigatório',
          minlength: 'Mínimo 2 caracteres',
          maxlength: 'Máximo 50 caracteres'
        }
      };

      super.configurarMensagensValidacaoBase(this.validationMessages);

    }

    ngOnInit() {
      this.fornecedorForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        documento: ['', [Validators.required, NgBrazilValidators.cpf]],
        ativo: ['', Validators.required],
        tipoFornecedor: ['', Validators.required],

        endereco: this.fb.group({
          logradouro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          complemento: [''],
          bairro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
          cep: ['', [Validators.required, NgBrazilValidators.cep]],
          cidade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
          estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
        })
      });

      this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true });
    }

    ngAfterViewInit(): void {
      this.tipoFornecedorForm().valueChanges
        .subscribe(() => {
          this.trocarValidacaoDocumento();
          super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm);
          super.validarFormulario(this.fornecedorForm);
      });
      super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm);
    }

    trocarValidacaoDocumento() {
      if (this.tipoFornecedorForm().value === '1'){
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
        this.textoDocumento = 'CPF obrigatório';
      }
      else {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
        this.textoDocumento = 'CNPJ obrigatório';
      }
    }

    tipoFornecedorForm(): AbstractControl {
      return this.fornecedorForm.get('tipoFornecedor');
    }

    documento(): AbstractControl {
      return this.fornecedorForm.get('documento');
    }

    buscarCep(cep: string) {

      cep = StringUtils.somenteNumeros(cep);
      if (cep.length < 8) return;

      this.fornecedorService.consultarCep(cep)
        .subscribe(
          cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
          erro => this.errors.push(erro));
    }

    preencherEnderecoConsulta(cepConsulta: CepConsulta) {
      this.fornecedorForm.patchValue({
        endereco: {
          logradouro: cepConsulta.logradouro,
          bairro: cepConsulta.bairro,
          cep: cepConsulta.cep,
          cidade: cepConsulta.localidade,
          estado: cepConsulta.uf
        }
      });
    }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

          this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);

          this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
          this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);

          this.fornecedorService.AdicionarFornecedor(this.fornecedor)
            .subscribe(
                sucesso => { this.processarSucesso(sucesso) },
                falha => { this.processarFalha(falha) }
           );
    }
  }

    processarSucesso(response: any) {
      this.fornecedorForm.reset();
      this.errors = [];

      this.mudancasNaoSalvas = false;

      let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
      if (toast) {
        toast.onHidden.subscribe(() => {
          this.router.navigate(['/fornecedores/listar-todos']);
        });
      }
    }

    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }
    }
