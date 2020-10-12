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
  
  constructor(
    private fb: FormBuilder,
    private tripulanteService: TripulanteService,
    private router: Router,
    private toastr: ToastrService) {super();}

    ngOnInit(): void {
      this.tripulanteForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
          email: ['', [Validators.email]],
          dataNascimento: [''],
          dataAdmissao: [''],
          sexo: [''],
          cargo: ['', [Validators.required]],
          estadoCivil: [''],
          salario: [''],
          situacao: [''],
          rg: [''],
          orgaoEmissor: [''],
          tituloEleitor: [''],
          numeroPis: [''],
          numeroCtps: [''],
          numeroCnh: [''],
          imagem: ['', [Validators.required]],
        });
      }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      adicionarTripulante() {
        if (this.tripulanteForm.dirty && this.tripulanteForm.valid) {
          this.tripulante = Object.assign({}, this.tripulante, this.tripulanteForm.value);

          this.tripulante.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
          this.tripulante.imagem = this.imagemNome;
          this.tripulante.salario = CurrencyUtils.StringParaDecimal(this.tripulante.salario);
          this.tripulante.cpf = StringUtils.somenteNumeros(this.tripulante.cpf);

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