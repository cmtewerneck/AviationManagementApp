import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MecanicoService } from '../services/mecanico.service';
import { CurrencyUtils } from '../../utils/currency-utils';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { MecanicoBaseComponent } from '../mecanico-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends MecanicoBaseComponent implements OnInit {
  
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
    private mecanicoService: MecanicoService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.mecanicoForm = this.fb.group({
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
        
        // MECÂNICO
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
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
      return this.mecanicoForm.get('tipoPessoa');
    }
    
    documento(): AbstractControl {
      return this.mecanicoForm.get('documento');
    }
    
    adicionarMecanico() {
      if (this.mecanicoForm.dirty && this.mecanicoForm.valid) {
        this.mecanico = Object.assign({}, this.mecanico, this.mecanicoForm.value);
        
        this.mecanico.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.mecanico.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        this.mecanico.tipoPessoa = Number(this.mecanico.tipoPessoa);
        this.mecanico.documento = StringUtils.somenteNumeros(this.mecanico.documento);
        this.mecanico.sexo = Number(this.mecanico.sexo);
        this.mecanico.ativo = this.mecanico.ativo.toString() == "true";
        if (this.mecanico.dataNascimento) { this.mecanico.dataNascimento = new Date(this.mecanico.dataNascimento); } else { this.mecanico.dataNascimento = null; }
        this.mecanico.dataAdmissao = new Date(this.mecanico.dataAdmissao);
        if (this.mecanico.dataDemissao) { this.mecanico.dataDemissao = new Date(this.mecanico.dataDemissao); } else { this.mecanico.dataDemissao = null; }
        this.mecanico.tipoColaborador = Number(this.mecanico.tipoColaborador);
        this.mecanico.salario = CurrencyUtils.StringParaDecimal(this.mecanico.salario);
        this.mecanico.tipoVinculo = Number(this.mecanico.tipoVinculo);
        // FIM DAS CONVERSÕES
        
        this.mecanico.tipoColaborador = 4;
        this.mecanico.cargo = 'Mecânico';
        
        console.log(this.mecanico);
        
        this.mecanicoService.novoMecanico(this.mecanico)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.mecanicoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Mecânico cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/mecanicos/listar-todos']);
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