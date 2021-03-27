import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../services/aluno.service';
import { AlunoBaseComponent } from '../aluno-form.base.component';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { AbstractControl } from '@angular/forms';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AlunoBaseComponent implements OnInit {
  
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
    private alunoService: AlunoService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.alunoForm = this.fb.group({
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
        
        // ALUNO
        rg: ['', [Validators.required, Validators.maxLength(20)]],
        canac: ['', [Validators.minLength(6), Validators.maxLength(6)]],
        //totalVoado: [0],
        saldo: ['0'],
        dataNascimento: ['', Validators.required],
        validadeCMA: ['']
      });
      
      this.alunoForm.patchValue({ tipoPessoa: 1, ativo: true, sexo: 1 });
    }
    
    ngAfterViewInit(): void {
      this.tipoAlunoForm().valueChanges
      .subscribe(() => {
        this.trocarValidacaoDocumento();
      });
      super.configurarValidacaoFormularioBase(this.formInputElements, this.alunoForm);
    }
    
    trocarValidacaoDocumento() {
      if (this.tipoAlunoForm().value === '1'){
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
    
    tipoAlunoForm(): AbstractControl {
      return this.alunoForm.get('tipoPessoa');
    }
    
    documento(): AbstractControl {
      return this.alunoForm.get('documento');
    }
    
    adicionarAluno() {
      if (this.alunoForm.dirty && this.alunoForm.valid) {
        
        this.aluno = Object.assign({}, this.aluno, this.alunoForm.value);
        
        this.aluno.imagemUpload = this.croppedImage.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.aluno.imagem = this.imagemNome;
        
        // CONVERSÕES PARA JSON
        this.aluno.tipoPessoa = Number(this.aluno.tipoPessoa);
        this.aluno.documento = StringUtils.somenteNumeros(this.aluno.documento);
        this.aluno.sexo = Number(this.aluno.sexo);
        this.aluno.ativo = this.aluno.ativo.toString() == "true";
        //this.aluno.totalVoado = CurrencyUtils.StringParaDecimal(this.aluno.totalVoado);
        this.aluno.saldo = CurrencyUtils.StringParaDecimal(this.aluno.saldo);
        this.aluno.dataNascimento = new Date(this.aluno.dataNascimento);
        if (this.aluno.validadeCMA) { this.aluno.validadeCMA = new Date(this.aluno.validadeCMA); } else { this.aluno.validadeCMA = null; }
        // FIM DAS CONVERSÕES
        
        console.log(this.aluno);
        
        this.alunoService.AdicionarAluno(this.aluno)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.alunoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Aluno cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/alunos/listar-todos']);
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
    
    