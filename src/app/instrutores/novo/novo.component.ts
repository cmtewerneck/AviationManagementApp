import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstrutorService } from '../services/instrutor.service';
import { CurrencyUtils } from '../../utils/currency-utils';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { InstrutorBaseComponent } from '../instrutor-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends InstrutorBaseComponent implements OnInit {
  
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
  
  MASKS = utilsBr.MASKS;
  
  textoDocumento: string = 'CPF requerido';
  
  constructor(
    private fb: FormBuilder,
    private instrutorService: InstrutorService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.instrutorForm = this.fb.group({
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
        
        // INSTRUTOR
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        validadeCMA: [''],
        tipoColaborador: [''],
        cargo: [''],
        canac: ['', [Validators.minLength(6), Validators.maxLength(6)]],
        salario: [''],
        tipoVinculo: ['', Validators.maxLength(30)],
        rg: ['', [Validators.required, Validators.maxLength(20)]],
        orgaoEmissor: ['', Validators.maxLength(20)],
        tituloEleitor: ['', Validators.maxLength(30)],
        numeroPis: ['', Validators.maxLength(30)],
        numeroCtps: ['', Validators.maxLength(30)],
        numeroCnh: ['', Validators.maxLength(30)]
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
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
      return this.instrutorForm.get('tipoPessoa');
    }
    
    documento(): AbstractControl {
      return this.instrutorForm.get('documento');
    }
    
    adicionarInstrutor() {
      if (this.instrutorForm.dirty && this.instrutorForm.valid) {
        this.instrutor = Object.assign({}, this.instrutor, this.instrutorForm.value);
        
        this.instrutor.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.instrutor.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        this.instrutor.tipoPessoa = Number(this.instrutor.tipoPessoa);
        this.instrutor.documento = StringUtils.somenteNumeros(this.instrutor.documento);
        this.instrutor.sexo = Number(this.instrutor.sexo);
        this.instrutor.ativo = this.instrutor.ativo.toString() == "true";
        if (this.instrutor.dataNascimento) { this.instrutor.dataNascimento = new Date(this.instrutor.dataNascimento); } else { this.instrutor.dataNascimento = null; }
        this.instrutor.dataAdmissao = new Date(this.instrutor.dataAdmissao);
        if (this.instrutor.dataDemissao) { this.instrutor.dataDemissao = new Date(this.instrutor.dataDemissao); } else { this.instrutor.dataDemissao = null; }
        if (this.instrutor.validadeCMA) { this.instrutor.validadeCMA = new Date(this.instrutor.validadeCMA); } else { this.instrutor.validadeCMA = null; }
        this.instrutor.tipoColaborador = Number(this.instrutor.tipoColaborador);
        this.instrutor.salario = CurrencyUtils.StringParaDecimal(this.instrutor.salario);
        this.instrutor.tipoVinculo = Number(this.instrutor.tipoVinculo);
        // FIM DAS CONVERSÕES
        
        this.instrutor.tipoColaborador = 3;
        this.instrutor.cargo = 'Instrutor';
        
        console.log(this.instrutor);
        
        this.instrutorService.novoInstrutor(this.instrutor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.instrutorForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Instrutor cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/instrutores/listar-todos']);
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