import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from '../services/veiculo.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { VeiculoBaseComponent } from '../veiculo-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends VeiculoBaseComponent implements OnInit {
  
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
    private veiculoService: VeiculoService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.veiculoForm = this.fb.group({
        placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
        ufPlaca: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        ano: [''],
        proprio: ['', Validators.required],
        kmAtual: [''],
        modelo: ['', [Validators.required, Validators.maxLength(30)]],
        renavam: ['', [Validators.required, Validators.maxLength(30)]],
        tipoCombustivel: [''],
        imagem: ['']
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarVeiculo() {
      if (this.veiculoForm.dirty && this.veiculoForm.valid) {
        this.veiculo = Object.assign({}, this.veiculo, this.veiculoForm.value);
        
        // this.formResult = JSON.stringify(this.produto);
        
        this.veiculo.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.veiculo.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        if (this.veiculo.ano) { this.veiculo.ano = Number(this.veiculo.ano); } else { this.veiculo.ano = null; }
        this.veiculo.proprio = this.veiculo.proprio.toString() == "true";
        if (this.veiculo.kmAtual) { this.veiculo.kmAtual = Number(this.veiculo.kmAtual); } else { this.veiculo.kmAtual = null; }
        this.veiculo.tipoCombustivel = Number(this.veiculo.tipoCombustivel);
        // FIM DAS CONVERSÕES

        console.log(this.veiculo);

        this.veiculoService.novoVeiculo(this.veiculo)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.veiculoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Veículo cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/veiculos/listar-todos']);
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