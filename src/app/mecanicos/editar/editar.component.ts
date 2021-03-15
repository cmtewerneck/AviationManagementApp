import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MecanicoService } from '../services/mecanico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Mecanico } from '../models/Mecanico';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { MecanicoBaseComponent } from '../mecanico-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends MecanicoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  textoDocumento: string = '';
  
  MASKS = utilsBr.MASKS;
  
  constructor(private fb: FormBuilder,
    private mecanicoService: MecanicoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.mecanico = this.route.snapshot.data['mecanico'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.mecanicoForm = this.fb.group({
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
        
        // MECÂNICO
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        tipoColaborador: [''],
        cargo: [''],
        canac: ['', [Validators.minLength(6), Validators.maxLength(6)]],
        salario: [''],
        tipoVinculo: ['', Validators.required],
        rg: ['', [Validators.required, Validators.maxLength(20)]],
        orgaoEmissor: ['', Validators.maxLength(20)],
        tituloEleitor: ['', Validators.maxLength(30)],
        numeroPis: ['', Validators.maxLength(30)],
        numeroCtps: ['', Validators.maxLength(30)],
        numeroCnh: ['', Validators.maxLength(30)]
      });
      
      this.mecanicoForm.patchValue({
        id: this.mecanico.id,
        nome: this.mecanico.nome,
        tipoPessoa: this.mecanico.tipoPessoa.toString(),
        documento: this.mecanico.documento,
        sexo: this.mecanico.sexo,
        estadoCivil: this.mecanico.estadoCivil,
        ativo: this.mecanico.ativo,
        telefone: this.mecanico.telefone,
        email: this.mecanico.email,
        
        dataNascimento: this.mecanico.dataNascimento,
        dataAdmissao: this.mecanico.dataAdmissao,
        dataDemissao: this.mecanico.dataDemissao,
        tipoColaborador: this.mecanico.tipoColaborador,
        cargo: this.mecanico.cargo,
        canac: this.mecanico.canac,
        salario: CurrencyUtils.DecimalParaString(this.mecanico.salario),
        tipoVinculo: this.mecanico.tipoVinculo,
        rg: this.mecanico.rg,
        orgaoEmissor: this.mecanico.orgaoEmissor,
        tituloEleitor: this.mecanico.tituloEleitor,
        numeroPis: this.mecanico.numeroPis,
        numeroCtps: this.mecanico.numeroCtps,
        numeroCnh: this.mecanico.numeroCnh
      });
      
      this.imagemOriginalSrc = this.imagens + this.mecanico.imagem;
      
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
      return this.mecanicoForm.get('documento');
    }
    
    tipoPessoaForm(): AbstractControl {
      return this.mecanicoForm.get('tipoPessoa');
    }
    
    editarMecanico() {
      if (this.mecanicoForm.dirty && this.mecanicoForm.valid) {
        this.mecanico = Object.assign({}, this.mecanico, this.mecanicoForm.value);
        
        if (this.imageBase64) {
          this.mecanico.imagemUpload = this.imageBase64;
          this.mecanico.imagem = this.imagemNome;
        }
        
        // CONVERSÕES PARA JSON
        this.mecanico.tipoPessoa = Number(this.mecanico.tipoPessoa);
        this.mecanico.documento = StringUtils.somenteNumeros(this.mecanico.documento);
        this.mecanico.sexo = Number(this.mecanico.sexo);
        this.mecanico.ativo = this.mecanico.ativo.toString() == "true";
        if (this.mecanico.dataNascimento) { this.mecanico.dataNascimento = new Date(this.mecanico.dataNascimento); } else { this.mecanico.dataNascimento = null; }
        this.mecanico.dataAdmissao = new Date(this.mecanico.dataAdmissao);
        if (this.mecanico.dataDemissao) { this.mecanico.dataDemissao = new Date(this.mecanico.dataDemissao); } else { this.mecanico.dataDemissao = null; }
        this.mecanico.tipoColaborador = Number(this.mecanico.tipoColaborador);
        this.mecanico.salario = CurrencyUtils.StringParaDecimal(this.mecanico.salario);
        this.mecanico.tipoVinculo = Number(this.mecanico.tipoVinculo);
        // FIM DAS CONVERSÕES
        
        this.mecanico.tipoColaborador = 4;
        this.mecanico.cargo = 'Mecânico';
        
        console.log(this.mecanico);
        
        this.mecanicoService.atualizarMecanico(this.mecanico)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.mecanicoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Mecânico editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/mecanicos/listar-todos']);
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