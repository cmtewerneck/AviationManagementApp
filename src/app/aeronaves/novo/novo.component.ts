import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveService } from '../services/aeronave.service';
import { CurrencyUtils } from '../../utils/currency-utils';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { AeronaveBaseComponent } from '../aeronave-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveBaseComponent implements OnInit {

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
              private aeronaveService: AeronaveService,
              private router: Router,
              private toastr: ToastrService) {super();}

  ngOnInit(): void {

     this.aeronaveForm = this.fb.group({
       matricula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
       fabricante: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       categoria: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
       modelo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
       numeroSerie: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
       ano: [''],
       pesoVazio: [''],
       horasTotais: [''],
       horasRestantes: [''],
       vencimentoCa: [''],
       vencimentoCm: [''],
       ultimaPesagem: [''],
       vencimentoReta: [''],
       imagem: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarAeronave() {
    if (this.aeronaveForm.dirty && this.aeronaveForm.valid) {
      this.aeronave = Object.assign({}, this.aeronave, this.aeronaveForm.value);
      
      // this.formResult = JSON.stringify(this.produto);

      this.aeronave.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
      this.aeronave.imagem = this.imagemNome;

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

