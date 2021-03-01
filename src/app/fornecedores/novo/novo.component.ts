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
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageUrl: string;
  imagemNome: string;
  
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
        logradouro: {
          required: 'O logradouro é obrigatório',
          maxlength: 'Máximo 50 caracteres'
        },
        numero: {
          required: 'O número é obrigatório',
          maxlength: 'Máximo 20 caracteres'
        },
        complemento: {
          maxlength: 'Máximo 20 caracteres'
        },
        bairro: {
          required: 'O bairro é obrigatório',
          maxlength: 'Máximo 50 caracteres'
        },
        cep: {
          required: 'O CEP é obrigatório',
          cep: 'CEP em formato inválido'
        },
        cidade: {
          required: 'A cidade é obrigatória',
          maxlength: 'Máximo 50 caracteres'
        },
        estado: {
          required: 'O estado é obrigatório',
          minlength: 'Mínimo 2 caracteres',
          maxlength: 'Máximo 2 caracteres'
        }
      };
      
      super.configurarMensagensValidacaoBase(this.validationMessages);
      
    }
    
    ngOnInit() {
      this.fornecedorForm = this.fb.group({
        // PESSOA 
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        tipoPessoa: ['', Validators.required],
        documento: ['', [Validators.required, NgBrazilValidators.cpf]],
        sexo: ['', Validators.required],
        estadoCivil: ['', Validators.maxLength(20)],
        ativo: [true],
        telefone: ['', Validators.maxLength(20)],
        email: ['', [Validators.email, Validators.maxLength(20)]],
        imagem: [''],
        
        // ENDEREÇO
        endereco: this.fb.group({
          logradouro: ['', [Validators.required, Validators.maxLength(50)]],
          numero: ['', [Validators.required, Validators.maxLength(20)]],
          complemento: ['', Validators.maxLength(20)],
          bairro: ['', [Validators.required, Validators.maxLength(50)]],
          cep: ['', [Validators.required, NgBrazilValidators.cep]],
          cidade: ['', [Validators.required, Validators.maxLength(60)]],
          estado: ['', [Validators.required, Validators.maxLength(2)]]
        })
      });
      
      this.fornecedorForm.patchValue({ tipoPessoa: '1', ativo: true, sexo: '1' });
    }
    
    ngAfterViewInit(): void {
      this.tipoPessoaForm().valueChanges
      .subscribe(() => {
        this.trocarValidacaoDocumento();
        super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm);
        super.validarFormulario(this.fornecedorForm);
      });
      super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm);
    }
    
    trocarValidacaoDocumento() {
      if (this.tipoPessoaForm().value === '1'){
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
    
    tipoPessoaForm(): AbstractControl {
      return this.fornecedorForm.get('tipoPessoa');
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
          
          this.fornecedor.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
          this.fornecedor.imagem = this.imagemNome;

          this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
          this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
          
          console.log(this.fornecedor);

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
        
        fileChangeEvent(event: any): void {
          this.imageChangedEvent = event;
          this.imagemNome = event.currentTarget.files[0].name;
        }
        
        imageCropped(event: ImageCroppedEvent) {
          this.croppedImage = event.base64;
        }
        
        imageLoaded() {
          this.showCropper = true;
        }
        
        cropperReady(sourceImageDimensions: Dimensions) {
          console.log('Cropper ready', sourceImageDimensions);
        }
        
        loadImageFailed() {
          this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
        }

}     