import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripulanteService } from '../services/tripulante.service';
import { CurrencyUtils } from '../../utils/currency-utils';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { TripulanteBaseComponent } from '../tripulante-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends TripulanteBaseComponent implements OnInit {
  
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
    private tripulanteService: TripulanteService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.tripulanteForm = this.fb.group({
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
        
        // TRIPULANTE
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
      return this.tripulanteForm.get('tipoPessoa');
    }
    
    documento(): AbstractControl {
      return this.tripulanteForm.get('documento');
    }
    
    adicionarTripulante() {
      if (this.tripulanteForm.dirty && this.tripulanteForm.valid) {
        this.tripulante = Object.assign({}, this.tripulante, this.tripulanteForm.value);
        
        this.tripulante.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.tripulante.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        this.tripulante.tipoPessoa = Number(this.tripulante.tipoPessoa);
        this.tripulante.documento = StringUtils.somenteNumeros(this.tripulante.documento);
        this.tripulante.sexo = Number(this.tripulante.sexo);
        this.tripulante.ativo = this.tripulante.ativo.toString() == "true";
        if (this.tripulante.dataNascimento) { this.tripulante.dataNascimento = new Date(this.tripulante.dataNascimento); } else { this.tripulante.dataNascimento = null; }
        this.tripulante.dataAdmissao = new Date(this.tripulante.dataAdmissao);
        if (this.tripulante.dataDemissao) { this.tripulante.dataDemissao = new Date(this.tripulante.dataDemissao); } else { this.tripulante.dataDemissao = null; }
        if (this.tripulante.validadeCMA) { this.tripulante.validadeCMA = new Date(this.tripulante.validadeCMA); } else { this.tripulante.validadeCMA = null; }
        this.tripulante.tipoColaborador = Number(this.tripulante.tipoColaborador);
        this.tripulante.salario = CurrencyUtils.StringParaDecimal(this.tripulante.salario);
        this.tripulante.tipoVinculo = Number(this.tripulante.tipoVinculo);
        // FIM DAS CONVERSÕES

        this.tripulante.tipoColaborador = 2;
        this.tripulante.cargo = 'Tripulante';

        console.log(this.tripulante);

        this.tripulanteService.novoTripulante(this.tripulante)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.tripulanteForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Tripulante cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/tripulantes/listar-todos']);
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