import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripulanteService } from '../services/tripulante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Tripulante } from '../models/Tripulante';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { TripulanteBaseComponent } from '../tripulante-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends TripulanteBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  textoDocumento: string = '';
  
  MASKS = utilsBr.MASKS;
  
  constructor(private fb: FormBuilder,
    private tripulanteService: TripulanteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.tripulante = this.route.snapshot.data['tripulante'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.tripulanteForm = this.fb.group({
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
        
        // TRIPULANTE
        dataNascimento: [''],
        dataAdmissao: ['', Validators.required],
        dataDemissao: [''],
        validadeCMA: [''],
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
      
      this.tripulanteForm.patchValue({
        id: this.tripulante.id,
        nome: this.tripulante.nome,
        tipoPessoa: this.tripulante.tipoPessoa.toString(),
        documento: this.tripulante.documento,
        sexo: this.tripulante.sexo,
        estadoCivil: this.tripulante.estadoCivil,
        ativo: this.tripulante.ativo,
        telefone: this.tripulante.telefone,
        email: this.tripulante.email,
        
        dataNascimento: this.tripulante.dataNascimento,
        dataAdmissao: this.tripulante.dataAdmissao,
        dataDemissao: this.tripulante.dataDemissao,
        validadeCMA: this.tripulante.validadeCMA,
        tipoColaborador: this.tripulante.tipoColaborador,
        cargo: this.tripulante.cargo,
        canac: this.tripulante.canac,
        salario: CurrencyUtils.DecimalParaString(this.tripulante.salario),
        tipoVinculo: this.tripulante.tipoVinculo,
        rg: this.tripulante.rg,
        orgaoEmissor: this.tripulante.orgaoEmissor,
        tituloEleitor: this.tripulante.tituloEleitor,
        numeroPis: this.tripulante.numeroPis,
        numeroCtps: this.tripulante.numeroCtps,
        numeroCnh: this.tripulante.numeroCnh
      });
      
      this.imagemOriginalSrc = this.imagens + this.tripulante.imagem;
      
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
      return this.tripulanteForm.get('documento');
    }
    
    tipoPessoaForm(): AbstractControl {
      return this.tripulanteForm.get('tipoPessoa');
    }
    
    editarTripulante() {
      if (this.tripulanteForm.dirty && this.tripulanteForm.valid) {
        this.tripulante = Object.assign({}, this.tripulante, this.tripulanteForm.value);
        
        if (this.imageBase64) {
          this.tripulante.imagemUpload = this.imageBase64;
          this.tripulante.imagem = this.imagemNome;
        }
        
        // CONVERSÕES PARA JSON
        this.tripulante.tipoPessoa = Number(this.tripulante.tipoPessoa);
        this.tripulante.documento = StringUtils.somenteNumeros(this.tripulante.documento);
        this.tripulante.sexo = Number(this.tripulante.sexo);
        this.tripulante.ativo = this.tripulante.ativo.toString() == "true";
        if (this.tripulante.dataNascimento) { this.tripulante.dataNascimento = new Date(this.tripulante.dataNascimento); } else { this.tripulante.dataNascimento = null; }
        this.tripulante.dataAdmissao = new Date(this.tripulante.dataAdmissao);
        if (this.tripulante.dataDemissao) { this.tripulante.dataDemissao = new Date(this.tripulante.dataDemissao); } else { this.tripulante.dataDemissao = null; }
        if (this.tripulante.validadeCMA) { this.tripulante.validadeCMA = new Date(this.tripulante.validadeCMA); } else { this.tripulante.validadeCMA = null; }
        this.tripulante.tipoColaborador = Number(this.tripulante.tipoColaborador);
        this.tripulante.salario = CurrencyUtils.StringParaDecimal(this.tripulante.salario);
        this.tripulante.tipoVinculo = Number(this.tripulante.tipoVinculo);
        // FIM DAS CONVERSÕES

        this.tripulante.tipoColaborador = 2;
        this.tripulante.cargo = 'Tripulante';

        console.log(this.tripulante);
        
        this.tripulanteService.atualizarTripulante(this.tripulante)
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
        
        let toast = this.toastr.success('Tripulante editado com sucesso!', 'Sucesso!');
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