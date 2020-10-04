import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { StringUtils } from 'src/app/utils/string-utils';
import { CepConsulta, Endereco } from '../models/Endereço';
import { Fornecedor } from '../models/Fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  fornecedorForm: FormGroup;
  enderecoForm: FormGroup;

  fornecedor: Fornecedor = new Fornecedor();
  endereco: Endereco = new Endereco();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento: string = '';
  mudancasNaoSalvas: boolean;

  MASKS = utilsBr.MASKS;
  tipoFornecedor: number;

  constructor(private fb: FormBuilder,
              private fornecedorService: FornecedorService,
              private router: Router,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute) {

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

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.fornecedor = this.route.snapshot.data['fornecedor'];
    this.tipoFornecedor = this.fornecedor.tipoFornecedor;
  }

  ngOnInit() {
    this.spinner.show();

    this.fornecedorForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', Validators.required],
      tipoFornecedor: ['', Validators.required]
    });

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      complemento: [''],
      bairro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      cidade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      fornecedorId: ''
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm() {

    this.fornecedorForm.patchValue({
      id: this.fornecedor.id,
      nome: this.fornecedor.nome,
      ativo: this.fornecedor.ativo,
      tipoFornecedor: this.fornecedor.tipoFornecedor.toString(),
      documento: this.fornecedor.documento
    });

    if (this.tipoFornecedorForm().value === '1') {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
    }
    else {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }

    this.enderecoForm.patchValue({
      id: this.fornecedor.endereco.id,
      logradouro: this.fornecedor.endereco.logradouro,
      numero: this.fornecedor.endereco.numero,
      complemento: this.fornecedor.endereco.complemento,
      bairro: this.fornecedor.endereco.bairro,
      cep: this.fornecedor.endereco.cep,
      cidade: this.fornecedor.endereco.cidade,
      estado: this.fornecedor.endereco.estado
    });
  }

  ngAfterViewInit() {
    this.tipoFornecedorForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });
    this.configurarElementosValidacao();
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  trocarValidacaoDocumento() {

    if (this.tipoFornecedorForm().value === '1') {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
    }

    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }
  }

  documento(): AbstractControl {
    return this.fornecedorForm.get('documento');
  }

  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor');
  }

  validarFormulario(){
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if(cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.enderecoForm.patchValue({
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,
      cep: cepConsulta.cep,
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf
    });
  }

  editarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
      console.log(this.fornecedor);
      this.fornecedorService.EditarFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];
    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
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

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {

      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);

      this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
      this.endereco.fornecedorId = this.fornecedor.id;

      this.fornecedorService.AtualizarEndereco(this.endereco)
        .subscribe(
          () => this.processarSucessoEndereco(this.endereco),
          falha => { this.processarFalhaEndereco(falha) }
        );
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.fornecedor.endereco = endereco;
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content: any) {
    content.show();
  }

  fecharModal(content: any) {
    content.hide();
  }

}
