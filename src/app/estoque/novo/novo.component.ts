import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService } from '../services/estoque.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { EstoqueBaseComponent } from '../estoque-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends EstoqueBaseComponent implements OnInit {

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
              private estoqueService: EstoqueService,
              private router: Router,
              private toastr: ToastrService) {super();}

  ngOnInit(): void {
     this.estoqueForm = this.fb.group({
       item: [''],
       partNumber: ['', [Validators.required]],
       nomenclatura: ['', [Validators.required]],
       quantidade: ['', [Validators.required]],
       localizacao: [''],
       partNumberAlternativo: [''],
       aplicacao: [''],
       capitulo: [''],
       serialNumber: [''],
       doc: [''],
       status: [''],
       imagem: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarEstoque() {
    if (this.estoqueForm.dirty && this.estoqueForm.valid) {
      this.estoque = Object.assign({}, this.estoque, this.estoqueForm.value);

      // this.formResult = JSON.stringify(this.produto);

      this.estoque.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
      this.estoque.imagem = this.imagemNome;

      this.estoqueService.novoEstoque(this.estoque)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.estoqueForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Item cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/estoque/listar-todos']);
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

