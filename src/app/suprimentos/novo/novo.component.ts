import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuprimentoService } from '../services/suprimento.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { SuprimentoBaseComponent } from '../suprimento-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends SuprimentoBaseComponent implements OnInit {
  
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
  
  constructor(private fb: FormBuilder,
    private suprimentoService: SuprimentoService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.suprimentoForm = this.fb.group({
        codigo: ['',  Validators.maxLength(30)],
        partNumber: ['', [Validators.required, Validators.maxLength(30)]],
        nomenclatura: ['', [Validators.required, Validators.maxLength(50)]],
        quantidade: [0, Validators.required],
        localizacao: ['', Validators.maxLength(30)],
        partNumberAlternativo: ['', Validators.maxLength(30)],
        aplicacao: ['', Validators.maxLength(20)],
        capitulo: ['', Validators.maxLength(20)],
        serialNumber: ['', Validators.maxLength(30)],
        doc: ['', Validators.maxLength(20)],
        imagem: ['']
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarSuprimento() {
      if (this.suprimentoForm.dirty && this.suprimentoForm.valid) {
        this.suprimento = Object.assign({}, this.suprimento, this.suprimentoForm.value);
        
        // this.formResult = JSON.stringify(this.produto);
        
        this.suprimento.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.suprimento.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        this.suprimento.quantidade = Number(this.suprimento.quantidade);
        // FIM DAS CONVERSÕES

        console.log(this.suprimento);

        this.suprimentoService.novoSuprimento(this.suprimento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.suprimentoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Item cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/suprimentos/listar-todos']);
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