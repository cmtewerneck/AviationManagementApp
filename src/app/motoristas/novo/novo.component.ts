import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MotoristaService } from '../services/motorista.service';
import { CurrencyUtils } from '../../utils/currency-utils';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { MotoristaBaseComponent } from '../motorista-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends MotoristaBaseComponent implements OnInit {
  
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
    private motoristaService: MotoristaService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.motoristaForm = this.fb.group({
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
        
        // Motorista
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        tipoColaborador: [''],
        cargo: [''],
        canac: [''],
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
      return this.motoristaForm.get('tipoPessoa');
    }
    
    documento(): AbstractControl {
      return this.motoristaForm.get('documento');
    }
    
    adicionarMotorista() {
      if (this.motoristaForm.dirty && this.motoristaForm.valid) {
        this.motorista = Object.assign({}, this.motorista, this.motoristaForm.value);
        
        this.motorista.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.motorista.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        this.motorista.tipoPessoa = Number(this.motorista.tipoPessoa);
        this.motorista.documento = StringUtils.somenteNumeros(this.motorista.documento);
        this.motorista.sexo = Number(this.motorista.sexo);
        this.motorista.ativo = this.motorista.ativo.toString() == "true";
        if (this.motorista.dataNascimento) { this.motorista.dataNascimento = new Date(this.motorista.dataNascimento); } else { this.motorista.dataNascimento = null; }
        this.motorista.dataAdmissao = new Date(this.motorista.dataAdmissao);
        if (this.motorista.dataDemissao) { this.motorista.dataDemissao = new Date(this.motorista.dataDemissao); } else { this.motorista.dataDemissao = null; }
        this.motorista.tipoColaborador = Number(this.motorista.tipoColaborador);
        this.motorista.salario = CurrencyUtils.StringParaDecimal(this.motorista.salario);
        this.motorista.tipoVinculo = Number(this.motorista.tipoVinculo);
        // FIM DAS CONVERSÕES

        this.motorista.tipoColaborador = 5;
        this.motorista.cargo = 'Motorista';
        this.motorista.canac = '';

        console.log(this.motorista);

        this.motoristaService.novoMotorista(this.motorista)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.motoristaForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Motorista cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/motoristas/listar-todos']);
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