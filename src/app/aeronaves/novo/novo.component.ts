import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveService } from '../services/aeronave.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { AeronaveBaseComponent } from '../aeronave-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  get aeronavesMotoresArray(): FormArray {
    return <FormArray>this.aeronaveForm.get('aeronavesMotores');
  }

  get aeronavesDocumentosArray(): FormArray {
    return <FormArray>this.aeronaveForm.get('aeronavesDocumentos');
  }

  // VARIÁVEIS PARA IMAGEM
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
  // FIM DA IMAGEM
  
  constructor(private fb: FormBuilder,
    private aeronaveService: AeronaveService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      
      this.aeronaveForm = this.fb.group({
        matricula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        fabricante: ['', [Validators.required,Validators.maxLength(50)]],
        categoria: ['', [Validators.required, Validators.maxLength(20)]],
        modelo: ['', [Validators.required, Validators.maxLength(30)]],
        numeroSerie: ['', Validators.maxLength(20)],
        ano: [''],
        pesoVazio: [''],
        pesoBasico: [''],
        horasTotais: ['', Validators.required],
        proximaIntervencao: ['', Validators.required],
        horasRestantes: [''],
        tipoAeronave: ['', Validators.required],
        ultimaPesagem: [''],
        proximaPesagem: [''],
        imagem: [''],
        situacao: [true, Validators.required],
        ativo: [true, Validators.required],
        aeronavesMotores: this.fb.array([this.criaMotor()]),
        aeronavesDocumentos: this.fb.array([this.criaDocumento()])
      });
    }

    criaMotor(): FormGroup {
      return this.fb.group({
        fabricante: ['', [Validators.required, Validators.maxLength(50)]],
        modelo: ['', [Validators.required, Validators.maxLength(50)]],
        numeroSerie: ['', [Validators.required, Validators.maxLength(50)]],
        horasTotais: [''],
        ciclosTotais: ['']
      });
    }

    criaDocumento(): FormGroup {
      return this.fb.group({
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        dataEmissao: [''],
        dataValidade: ['', Validators.required],
        arquivo: ['']
      });
    }

    adicionarMotor(){
      this.aeronavesMotoresArray.push(this.criaMotor());
    }

    adicionarDocumento(){
      this.aeronavesDocumentosArray.push(this.criaDocumento());
    }

    removerMotor(id: number){
      this.aeronavesMotoresArray.removeAt(id);
    }

    removerDocumento(id: number){
      this.aeronavesDocumentosArray.removeAt(id);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarAeronave() {
      if (this.aeronaveForm.dirty && this.aeronaveForm.valid) {
        this.aeronave = Object.assign({}, this.aeronave, this.aeronaveForm.value);
        
        this.aeronave.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.aeronave.imagem = this.imagemNome;
        
        // CONVERSÕES DE JSON
        if (this.aeronave.ano) { this.aeronave.ano = Number(this.aeronave.ano); } else { this.aeronave.ano = null; }
        this.aeronave.pesoVazio = CurrencyUtils.StringParaDecimal(this.aeronave.pesoVazio);
        this.aeronave.pesoBasico = CurrencyUtils.StringParaDecimal(this.aeronave.pesoBasico);
        this.aeronave.horasTotais = CurrencyUtils.StringParaDecimal(this.aeronave.horasTotais);
        this.aeronave.proximaIntervencao = CurrencyUtils.StringParaDecimal(this.aeronave.proximaIntervencao);
        this.aeronave.horasRestantes = CurrencyUtils.StringParaDecimal(this.aeronave.horasRestantes);
        if (this.aeronave.ultimaPesagem) { this.aeronave.ultimaPesagem = new Date(this.aeronave.ultimaPesagem); } else { this.aeronave.ultimaPesagem = null; }
        if (this.aeronave.proximaPesagem) { this.aeronave.proximaPesagem = new Date(this.aeronave.proximaPesagem); } else { this.aeronave.proximaPesagem = null; }
        this.aeronave.ativo = this.aeronave.ativo.toString() == "true";
        this.aeronave.situacao = this.aeronave.situacao.toString() == "true";
        // FIM DAS CONVERSÕES

        console.log(this.aeronave);
        
        this.aeronaveService.novaAeronave(this.aeronave)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.aeronaveForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Aeronave cadastrada com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/aeronaves/listar-todos']);
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
    
    