import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MotoristaService } from '../services/motorista.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Motorista } from '../models/Motorista';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { MotoristaBaseComponent } from '../motorista-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends MotoristaBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  textoDocumento: string = '';
  
  MASKS = utilsBr.MASKS;
  
  constructor(private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.motorista = this.route.snapshot.data['motorista'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.motoristaForm = this.fb.group({
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
        
        // Motorista
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        tipoColaborador: [''],
        cargo: [''],
        canac: [''],
        salario: [''],
        tipoVinculo: ['', Validators.required],
        rg: ['', [Validators.required, Validators.maxLength(20)]],
        orgaoEmissor: ['', Validators.maxLength(20)],
        tituloEleitor: ['', Validators.maxLength(30)],
        numeroPis: ['', Validators.maxLength(30)],
        numeroCtps: ['', Validators.maxLength(30)],
        numeroCnh: ['', Validators.maxLength(30)]
      });
      
      this.motoristaForm.patchValue({
        id: this.motorista.id,
        nome: this.motorista.nome,
        tipoPessoa: this.motorista.tipoPessoa.toString(),
        documento: this.motorista.documento,
        sexo: this.motorista.sexo,
        estadoCivil: this.motorista.estadoCivil,
        ativo: this.motorista.ativo,
        telefone: this.motorista.telefone,
        email: this.motorista.email,
        
        dataNascimento: this.motorista.dataNascimento,
        dataAdmissao: this.motorista.dataAdmissao,
        dataDemissao: this.motorista.dataDemissao,
        tipoColaborador: this.motorista.tipoColaborador,
        cargo: this.motorista.cargo,
        canac: this.motorista.canac,
        salario: CurrencyUtils.DecimalParaString(this.motorista.salario),
        tipoVinculo: this.motorista.tipoVinculo,
        rg: this.motorista.rg,
        orgaoEmissor: this.motorista.orgaoEmissor,
        tituloEleitor: this.motorista.tituloEleitor,
        numeroPis: this.motorista.numeroPis,
        numeroCtps: this.motorista.numeroCtps,
        numeroCnh: this.motorista.numeroCnh
      });
      
      this.imagemOriginalSrc = this.imagens + this.motorista.imagem;
      
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
      return this.motoristaForm.get('documento');
    }
    
    tipoPessoaForm(): AbstractControl {
      return this.motoristaForm.get('tipoPessoa');
    }
    
    editarMotorista() {
      if (this.motoristaForm.dirty && this.motoristaForm.valid) {
        this.motorista = Object.assign({}, this.motorista, this.motoristaForm.value);
        
        if (this.imageBase64) {
          this.motorista.imagemUpload = this.imageBase64;
          this.motorista.imagem = this.imagemNome;
        }
        
        // CONVERSÕES PARA JSON
        this.motorista.tipoPessoa = Number(this.motorista.tipoPessoa);
        this.motorista.documento = StringUtils.somenteNumeros(this.motorista.documento);
        this.motorista.sexo = Number(this.motorista.sexo);
        this.motorista.ativo = this.motorista.ativo.toString() == "true";
        if (this.motorista.dataNascimento) { this.motorista.dataNascimento = new Date(this.motorista.dataNascimento); } else { this.motorista.dataNascimento = null; }
        this.motorista.dataAdmissao = new Date(this.motorista.dataAdmissao);
        if (this.motorista.dataDemissao) { this.motorista.dataDemissao = new Date(this.motorista.dataDemissao); } else { this.motorista.dataDemissao = null; }
        this.motorista.tipoColaborador = Number(this.motorista.tipoColaborador);
        this.motorista.salario = CurrencyUtils.StringParaDecimal(this.motorista.salario);
        this.motorista.tipoVinculo = Number(this.motorista.tipoVinculo);
        // FIM DAS CONVERSÕES
        
        this.motorista.tipoColaborador = 5;
        this.motorista.cargo = 'Motorista';
        this.motorista.canac = '';
        
        console.log(this.motorista);
        
        this.motoristaService.atualizarMotorista(this.motorista)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.motoristaForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Motorista editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/motoristas/listar-todos']);
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