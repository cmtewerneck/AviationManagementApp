import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../services/aluno.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlunoBaseComponent } from '../aluno-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { environment } from 'src/environments/environment';
import { AbstractControl } from '@angular/forms';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AlunoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  textoDocumento: string = '';
  MASKS = utilsBr.MASKS;
  
  constructor(private fb: FormBuilder,
    private alunoService: AlunoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.aluno = this.route.snapshot.data['aluno'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
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
        totalVoado: ['', Validators.required],
        saldo: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        validadeCMA: ['']
      });
      
      this.alunoForm.patchValue({
        id: this.aluno.id,
        nome: this.aluno.nome,
        tipoPessoa: this.aluno.tipoPessoa,
        documento: this.aluno.documento,
        sexo: this.aluno.sexo,
        estadoCivil: this.aluno.estadoCivil,
        ativo: this.aluno.ativo,
        telefone: this.aluno.telefone,
        email: this.aluno.email,
        rg: this.aluno.rg,
        canac: this.aluno.canac,
        totalVoado: CurrencyUtils.DecimalParaString(this.aluno.totalVoado),
        saldo: CurrencyUtils.DecimalParaString(this.aluno.saldo),
        dataNascimento: this.aluno.dataNascimento,
        validadeCMA: this.aluno.validadeCMA
      });
      
      if (this.tipoAlunoForm().value === '1') {
        this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      }
      else {
        this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      }
      
      this.imagemOriginalSrc = this.imagens + this.aluno.imagem;
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit() {
      this.tipoAlunoForm().valueChanges.subscribe(() => {
        this.trocarValidacaoDocumento();
      });
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    trocarValidacaoDocumento() {
      
      if (this.tipoAlunoForm().value === '1') {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      }
      
      else {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      }
    }
    
    documento(): AbstractControl {
      return this.alunoForm.get('documento');
    }
    
    tipoAlunoForm(): AbstractControl {
      return this.alunoForm.get('tipoPessoa');
    }
    
    editarAluno() {
      if (this.alunoForm.dirty && this.alunoForm.valid) {
        
        this.aluno = Object.assign({}, this.aluno, this.alunoForm.value);
        
        if (this.imageBase64) {
          this.aluno.imagemUpload = this.imageBase64;
          this.aluno.imagem = this.imagemNome;
        }
        
        this.aluno.documento = StringUtils.somenteNumeros(this.aluno.documento);
        this.aluno.saldo = CurrencyUtils.StringParaDecimal(this.aluno.saldo);
        this.aluno.totalVoado = CurrencyUtils.StringParaDecimal(this.aluno.totalVoado);
        
        this.alunoService.EditarAluno(this.aluno)
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
        
        let toast = this.toastr.success('Aluno editado com sucesso!', 'Sucesso!');
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
      
      upload(file: any) {
        this.imagemNome = file[0].name;
        
        var reader = new FileReader();
        reader.onload = this.manipularReader.bind(this);
        reader.readAsBinaryString(file[0]);
      }
      
      manipularReader(readerEvt: any) {
        var binaryString = readerEvt.target.result;
        this.imageBase64 = btoa(binaryString);
        this.imagemPreview = 'data:image/jpeg;base64,' + this.imageBase64;
      }
    }