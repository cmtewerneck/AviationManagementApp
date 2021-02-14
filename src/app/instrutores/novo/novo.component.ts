import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstrutorService } from '../services/instrutor.service';
import { CurrencyUtils } from '../../utils/currency-utils';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { InstrutorBaseComponent } from '../instrutor-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

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
  
  constructor(
    private fb: FormBuilder,
    private instrutorService: InstrutorService,
    private router: Router,
    private toastr: ToastrService) {super();}

    ngOnInit(): void {
      this.instrutorForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
          rg: ['', [Validators.required, Validators.maxLength(15)]],
          email: ['', [Validators.email]],
          telefone: ['', [Validators.required, Validators.maxLength(20)]],
          canac: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
          dataNascimento: [''],
          dataAdmissao: [''],
          sexo: [''],
          estadoCivil: [''],
          salario: [''],
          imagem: ['', [Validators.required]],
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      adicionarInstrutor() {
        if (this.instrutorForm.dirty && this.instrutorForm.valid) {
          this.instrutor = Object.assign({}, this.instrutor, this.instrutorForm.value);

          this.instrutor.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
          this.instrutor.imagem = this.imagemNome;
          this.instrutor.salario = CurrencyUtils.StringParaDecimal(this.instrutor.salario);
          this.instrutor.cpf = StringUtils.somenteNumeros(this.instrutor.cpf);

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