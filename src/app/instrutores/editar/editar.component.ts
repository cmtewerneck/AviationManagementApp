import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstrutorService } from '../services/instrutor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Instrutor } from '../models/Instrutor';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { InstrutorBaseComponent } from '../instrutor-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends InstrutorBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  textoDocumento: string = '';
  
  MASKS = utilsBr.MASKS;
  
  constructor(private fb: FormBuilder,
    private instrutorService: InstrutorService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.instrutor = this.route.snapshot.data['instrutor'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.instrutorForm = this.fb.group({
        // PESSOA 
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        tipoPessoa: ['', Validators.required],
        documento: ['', [Validators.required, NgBrazilValidators.cpf]],
        sexo: ['', Validators.required],
        estadoCivil: ['', Validators.maxLength(20)],
        ativo: [0],
        telefone: ['', Validators.maxLength(20)],
        email: ['', [Validators.email, Validators.maxLength(20)]],
        imagem: [''],
        
        // INSTRUTOR
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        tipoColaborador: [''],
        cargo: [''],
        canac: ['', [Validators.minLength(6), Validators.maxLength(30)]],
        salario: [''],
        tipoVinculo: ['', Validators.required],
        rg: ['', [Validators.required, Validators.maxLength(20)]],
        orgaoEmissor: ['', Validators.maxLength(20)],
        tituloEleitor: ['', Validators.maxLength(30)],
        numeroPis: ['', Validators.maxLength(30)],
        numeroCtps: ['', Validators.maxLength(30)],
        numeroCnh: ['', Validators.maxLength(30)]
      });
      
      this.instrutorForm.patchValue({
        id: this.instrutor.id,
        nome: this.instrutor.nome,
        tipoPessoa: this.instrutor.tipoPessoa.toString(),
        documento: this.instrutor.documento,
        sexo: this.instrutor.sexo,
        estadoCivil: this.instrutor.estadoCivil,
        ativo: this.instrutor.ativo,
        telefone: this.instrutor.telefone,
        email: this.instrutor.email,
        
        dataNascimento: this.instrutor.dataNascimento,
        dataAdmissao: this.instrutor.dataAdmissao,
        dataDemissao: this.instrutor.dataDemissao,
        tipoColaborador: this.instrutor.tipoColaborador,
        cargo: this.instrutor.cargo,
        canac: this.instrutor.canac,
        salario: CurrencyUtils.DecimalParaString(this.instrutor.salario),
        tipoVinculo: this.instrutor.tipoVinculo,
        rg: this.instrutor.rg,
        orgaoEmissor: this.instrutor.orgaoEmissor,
        tituloEleitor: this.instrutor.tituloEleitor,
        numeroPis: this.instrutor.numeroPis,
        numeroCtps: this.instrutor.numeroCtps,
        numeroCnh: this.instrutor.numeroCnh
      });
      
      this.imagemOriginalSrc = this.imagens + this.instrutor.imagem;
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    trocarValidacaoDocumento() {
      
      if (this.tipoPessoaForm().value === '1') {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      }
      
      else {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      }
    }
    
    documento(): AbstractControl {
      return this.instrutorForm.get('documento');
    }
    
    tipoPessoaForm(): AbstractControl {
      return this.instrutorForm.get('tipoPessoa');
    }
    
    editarInstrutor() {
      if (this.instrutorForm.dirty && this.instrutorForm.valid) {
        this.instrutor = Object.assign({}, this.instrutor, this.instrutorForm.value);
        
        if (this.imageBase64) {
          this.instrutor.imagemUpload = this.imageBase64;
          this.instrutor.imagem = this.imagemNome;
        }
        
        // CONVERSÕES PARA JSON
        this.instrutor.tipoPessoa = Number(this.instrutor.tipoPessoa);
        this.instrutor.documento = StringUtils.somenteNumeros(this.instrutor.documento);
        this.instrutor.sexo = Number(this.instrutor.sexo);
        this.instrutor.ativo = this.instrutor.ativo.toString() == "true";
        if (this.instrutor.dataNascimento) { this.instrutor.dataNascimento = new Date(this.instrutor.dataNascimento); } else { this.instrutor.dataNascimento = null; }
        this.instrutor.dataAdmissao = new Date(this.instrutor.dataAdmissao);
        if (this.instrutor.dataDemissao) { this.instrutor.dataDemissao = new Date(this.instrutor.dataDemissao); } else { this.instrutor.dataDemissao = null; }
        this.instrutor.tipoColaborador = Number(this.instrutor.tipoColaborador);
        this.instrutor.salario = CurrencyUtils.StringParaDecimal(this.instrutor.salario);
        this.instrutor.tipoVinculo = Number(this.instrutor.tipoVinculo);
        // FIM DAS CONVERSÕES
        
        this.instrutor.tipoColaborador = 3;
        this.instrutor.cargo = 'Instrutor';
        
        console.log(this.instrutor);
        
        this.instrutorService.atualizarInstrutor(this.instrutor)
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
        
        let toast = this.toastr.success('Instrutor editado com sucesso!', 'Sucesso!');
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