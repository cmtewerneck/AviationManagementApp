import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../services/cliente.service';
import { ClienteBaseComponent } from '../cliente-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ClienteBaseComponent implements OnInit {
  
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
  
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.clienteForm = this.fb.group({
        // PESSOA 
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        tipoPessoa: ['', Validators.required],
        documento: ['', [Validators.required, NgBrazilValidators.cpf]],
        sexo: ['', Validators.required],
        estadoCivil: ['', Validators.maxLength(20)],
        ativo: [''],
        telefone: ['', Validators.maxLength(20)],
        email: ['', [Validators.email, Validators.maxLength(20)]],
        imagem: ['']
      });
      
      this.clienteForm.patchValue({ tipoPessoa: '1', ativo: true, sexo: '1' });
    }
    
    ngAfterViewInit(): void {
      this.tipoClienteForm().valueChanges
      .subscribe(() => {
        this.trocarValidacaoDocumento();
      });
      super.configurarValidacaoFormularioBase(this.formInputElements, this.clienteForm);
    }
    
    trocarValidacaoDocumento() {
      if (this.tipoClienteForm().value === '1'){
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
    
    tipoClienteForm(): AbstractControl {
      return this.clienteForm.get('tipoPessoa');
    }
    
    documento(): AbstractControl {
      return this.clienteForm.get('documento');
    }
    
    adicionarCliente() {
      if (this.clienteForm.dirty && this.clienteForm.valid) {

        this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);

        this.cliente.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.cliente.imagem = this.imagemNome;

        // CONVERSÕES PARA JSON
        this.cliente.tipoPessoa = Number(this.cliente.tipoPessoa);
        this.cliente.documento = StringUtils.somenteNumeros(this.cliente.documento);
        this.cliente.sexo = Number(this.cliente.sexo);
        this.cliente.ativo = this.cliente.ativo.toString() == "true";
        // FIM DAS CONVERSÕES

        console.log(this.cliente);

        this.clienteService.AdicionarCliente(this.cliente)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.clienteForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Cliente cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/clientes/listar-todos']);
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